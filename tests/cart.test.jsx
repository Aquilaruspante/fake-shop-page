import { it, expect, describe, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import userEvent from '@testing-library/user-event';
import mockRouterConfig from './mockRouteConfig';

vi.mock('../src/cartManager', async () => {
    const actual = await vi.importActual('../src/cartManager');

    return {
        ...actual, 
        addToCart: vi.fn(),
        removeFromCart: vi.fn(),
        fakeCheckout: vi.fn(),
    };
});

import { addToCart, removeFromCart, fakeCheckout } from '../src/cartManager';

describe('cart rendering', () => {
    it('should render cards', async () => {
        const router = createMemoryRouter(mockRouterConfig, {
            initialEntries: ['/cart']
        });
        render(<RouterProvider router={router} />);
        
        const cards = await screen.findAllByLabelText('product card');
        expect(cards).toHaveLength(2);

        const titles = await screen.findAllByLabelText('title');
        expect(titles).toHaveLength(2);
        const [titleOne, titleTwo] = titles;
        expect(titleOne).toHaveTextContent('jacket');
        expect(titleTwo).toHaveTextContent('bracelet');

        const images = await screen.findAllByRole('img');
        expect(images).toHaveLength(2);

        const quantities = await screen.findAllByLabelText('quantity');
        expect(quantities).toHaveLength(2);
        const [quantityOne, quantityTwo] = quantities;
        expect(quantityOne).toHaveTextContent('2');
        expect(quantityTwo).toHaveTextContent('3');

        const prices = await screen.findAllByLabelText('price');
        expect(prices).toHaveLength(2);
        const [priceOne, priceTwo] = prices;
        expect(priceOne).toHaveTextContent('34');
        expect(priceTwo).toHaveTextContent('233');

        const totals = await screen.findAllByLabelText('total');
        expect(totals).toHaveLength(2);
        const [totalOne, totalTwo] = totals;
        expect(totalOne).toHaveTextContent('68');
        expect(totalTwo).toHaveTextContent('699');
    });
});

describe('addToCart buttons', async() => {
    it('should call removeFromCart and addToCart with correct objects when respective buttons clicked', async() => {
        const router = createMemoryRouter(mockRouterConfig, {
            initialEntries: ['/cart']
        });
        const user = userEvent.setup();
        render(<RouterProvider router={router} />);

        const buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(5);
        const [minusButtonOne, plusButtonOne, minusButtonTwo, plusButtonTwo] = buttons;

        await user.click(minusButtonOne);
        expect(removeFromCart).toHaveBeenCalledTimes(1);
        expect(removeFromCart).toHaveBeenCalledWith({
            id: 0,
            title: 'jacket',
            category: "men's clothing",
            description: 'a jacket',
            image: 'imageurl',
            price: 34,
            quantity: 2,
        });

        await user.click(plusButtonOne);
        expect(addToCart).toHaveBeenCalledTimes(1);
        expect(addToCart).toHaveBeenCalledWith({
            id: 0,
            title: 'jacket',
            category: "men's clothing",
            description: 'a jacket',
            image: 'imageurl',
            price: 34,
            quantity: 2,
        });

        await user.click(minusButtonTwo);
        expect(removeFromCart).toHaveBeenCalledTimes(2);
        expect(removeFromCart).toHaveBeenCalledWith({
            id: 1,
            title: 'bracelet',
            category: 'jewelery',
            description: 'a bracelet',
            image: 'braceletimage',
            price: 233,
            quantity: 3,
        });


        await user.click(plusButtonTwo);
        expect(addToCart).toHaveBeenCalledTimes(2);
        expect(addToCart).toHaveBeenCalledWith({
            id: 1,
            title: 'bracelet',
            category: 'jewelery',
            description: 'a bracelet',
            image: 'braceletimage',
            price: 233,
            quantity: 3,
        });
    });
});

describe('checkout dialogue', () => {
    it('should render checkout dialogue', async() => {
        const router = createMemoryRouter(mockRouterConfig, {
            initialEntries: ['/cart']
        });
        const user = userEvent.setup();

        render(<RouterProvider router={router} />);

        const checkoutDialogue = await screen.findByLabelText('checkout dialogue');
        expect(checkoutDialogue).toBeInTheDocument();

        const itemsCounter = await screen.findByLabelText('items total');
        expect(itemsCounter).toBeInTheDocument();
        expect(itemsCounter).toHaveTextContent('Items: 5');

        const total = await screen.findByLabelText('total price');
        expect(total).toBeInTheDocument();
        expect(total).toHaveTextContent('Total: 767 $');

        const checkoutButton = await screen.findByRole('button', { name: 'Checkout'});
        expect(checkoutButton).toBeInTheDocument();
        await user.click(checkoutButton);
        expect(fakeCheckout).toHaveBeenCalled();
    });
});