import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import mockRouterConfig from './mockRouteConfig';


const router = createMemoryRouter(mockRouterConfig, {
    initialEntries: ['/store/products/0']
});

describe('ProductPage render', () => {
    it('renders product page correctly', async () => {
        render(<RouterProvider router={router} />);

        const image = await screen.findByRole('img');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'http://example.com');
   
        const header = await screen.findByLabelText('product title');
        expect(header).toHaveTextContent('jacket');

        const price = await screen.findByLabelText('price');
        expect(price).toBeInTheDocument();
        expect(price).toHaveTextContent('0.1');

        const description = await screen.findByLabelText('description');
        expect(description).toBeInTheDocument();
        expect(description).toHaveTextContent('confy');
    });
   
})