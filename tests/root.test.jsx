import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import routeConfig from '../src/routeConfig.jsx';

describe('root', () => {
    it('should render the header', async () => {
        const router = createMemoryRouter(routeConfig, {
            initialEntries: ['/']
        });

        render(<RouterProvider router={router} />);
        
        const title = await screen.findByText('Mocksy');
        expect(title).toBeInTheDocument();

        const homeLink = await screen.findByTestId('home');
        expect(homeLink).toBeInTheDocument();

        const storeLink = await screen.findByTestId('store');
        expect(storeLink).toBeInTheDocument();

        const cartLink = await screen.findByTestId('cart');
        expect(cartLink).toBeInTheDocument();
    });

    it('should render the home page hero correctly', async () => {
        const router = createMemoryRouter(routeConfig, {
            initialEntries: ['/']
        });

        render(<RouterProvider router={router} />);

        const firstLine = await screen.findByText('We guaratee the best prices on the market');
        const secondLine = await screen.findByText("If you find it cheaper... well that shouldn't happen");

        expect(firstLine).toBeInTheDocument();
        expect(secondLine).toBeInTheDocument();
    });
});