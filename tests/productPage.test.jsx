import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import userEvent from '@testing-library/user-event';
import mockRouterConfig from './mockRouteConfig';
import { removeFromCart, addToCart } from '../src/cartManager';


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
   
});

describe('addToCart buttons', async() => {
    it('should call removeFromCart and addToCart with correct objects when respective buttons clicked', async() => {
        const user = userEvent.setup();
        render(<RouterProvider router={router} />);

        const buttons = await screen.findAllByRole('button');
        const [minusButton, plusButton] = buttons;

        await user.click(minusButton);
        expect(removeFromCart).toHaveBeenCalledTimes(1);
        expect(removeFromCart).toHaveBeenCalledWith({
            id: 0,
            title: "jacket",
            price: 0.1,
            description: "confy",
            category: "clothes",
            image: "http://example.com"
        });

        await user.click(plusButton);
        expect(addToCart).toHaveBeenCalledTimes(1);
        expect(addToCart).toHaveBeenCalledWith({
            id: 0,
            title: "jacket",
            price: 0.1,
            description: "confy",
            category: "clothes",
            image: "http://example.com"
        });
    });
});