import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';

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

        const cartItemsNumber = await screen.findByTestId('cart-items-number');
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

    it('links should work correctly', () => {
        const router = createMemoryRouter(routeConfig, {
            initialEntries: ['/']
        });

        const user = userEvent.setup();
        render(<RouterProvider router={router} />);


    })
});
