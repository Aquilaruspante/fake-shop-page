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
});