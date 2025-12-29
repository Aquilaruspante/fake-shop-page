import { it, expect, describe, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider, useNavigate } from 'react-router';
import userEvent from '@testing-library/user-event';

vi.mock('react-router', async() => {
    const actual = await vi.importActual('react-router');

    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

const mockNavigate = vi.fn();
useNavigate.mockReturnValue(mockNavigate);

import routeConfig from './mockRouteConfig';

describe('root', () => {
    it('should render the header', async () => {
        const router = createMemoryRouter(routeConfig, {
            initialEntries: ['/']
        });

        render(<RouterProvider router={router} />);
        
        const title = await screen.findByText('MOCKSI');
        expect(title).toBeInTheDocument();

        const homeLink = await screen.findByTestId('home');
        expect(homeLink).toBeInTheDocument();

        const storeLink = await screen.findByTestId('store');
        expect(storeLink).toBeInTheDocument();

        const cartLink = await screen.findByTestId('cart');
        expect(cartLink).toBeInTheDocument();

        const cartItemsNumberArray = await screen.findAllByLabelText('total-items');
        const cartItemsNumber = cartItemsNumberArray[0];
        expect(cartItemsNumber).toBeInTheDocument();
        expect(cartItemsNumber).toHaveTextContent('5');
    });

    it('should render the home page correctly', async () => {
        const router = createMemoryRouter(routeConfig, {
            initialEntries: ['/']
        });

        render(<RouterProvider router={router} />);

        const firstLine = await screen.findByText('We guaratee the best prices on the market');
        const secondLine = await screen.findByText("If you find it cheaper... well that shouldn't happen");
        const button = await screen.findByRole('button');

        expect(firstLine).toBeInTheDocument();
        expect(secondLine).toBeInTheDocument();
        expect(button).toBeInTheDocument();
        expect(button).toHaveTextContent('Shop with us');
    });

    it('links should work correctly', async () => {
        const router = createMemoryRouter(routeConfig, {
            initialEntries: ['/']
        });

        const user = userEvent.setup();
        render(<RouterProvider router={router} />);

        const homeLink = await screen.findByTestId('home');
        expect(homeLink).toHaveAttribute('href', '/');

        const storeLink = await screen.findByTestId('store');
        expect(storeLink).toHaveAttribute('href', '/store');

        const cartLink = await screen.findByTestId('cart');
        expect(cartLink).toHaveAttribute('href', '/cart');
    });

    it('button should work', async () => {
        const router = createMemoryRouter(routeConfig, {
            initialEntries: ['/']
        });

        const user = userEvent.setup();
        render(<RouterProvider router={router} />);

        const button = await screen.findByRole('button', { name: 'Shop with us'});
        await user.click(button);

        expect(mockNavigate).toHaveBeenCalledWith('/store');
        expect(mockNavigate).toHaveBeenCalledTimes(1);
    });
});
