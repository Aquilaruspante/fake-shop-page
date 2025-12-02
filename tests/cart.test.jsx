import { it, expect, describe } from 'vitest';
import { screen, render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';
import mockRouterConfig from './mockRouteConfig';

const router = createMemoryRouter(mockRouterConfig, {
    initialEntries: ['/cart']
});

describe('cart rendering', () => {
    it('should render cards', async () => {
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
    })
})