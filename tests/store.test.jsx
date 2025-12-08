import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider, useSubmit, useNavigate } from 'react-router';
import userEvent from '@testing-library/user-event';
import mockRouteConfig from './mockRouteConfig';
import { removeFromCart, addToCart } from '../src/cartManager';

vi.mock('react-router', async() => {
    const actual = await vi.importActual('react-router');

    return {
        ...actual,
        useSubmit: vi.fn(),
        useNavigate: vi.fn(),
    };
});

vi.mock('../src/cartManager', async() => {
    const actual = await vi.importActual('../src/cartManager');

    return {
        ...actual,
        removeFromCart: vi.fn(),
        addToCart: vi.fn(),
    };
});


function createRouter(entry) {
    return createMemoryRouter(mockRouteConfig, {
        initialEntries: entry,
    });
};

describe('loadingPage', () => {
    it('should render loadingPage before data loaded', async() => {
        const router = createRouter(['/store']);

        render(<RouterProvider router={router} />);

        screen.debug();

        const loading = screen.getByLabelText('loading screen');
        expect(loading).toBeInTheDocument();

        await waitForElementToBeRemoved(loading);
    })
})

describe('second header', () => {
    it('should render navLinks and the search field.', async () => {
        const router = createRouter(['/store']);

        render(<RouterProvider router={router} />);

        const allLink = await screen.findByRole('link', { name: 'All'});
        expect(allLink).toBeInTheDocument();
        expect(allLink).toHaveAttribute('href', '/store');

        const mensClothingLink = await screen.findByRole('link', { name: "Men's clothing"});
        expect(mensClothingLink).toBeInTheDocument();
        expect(mensClothingLink).toHaveAttribute('href', '/store/mensclothing');

        const womensClothingLink = await screen.findByRole('link', { name: "Women's clothing"});
        expect(womensClothingLink).toBeInTheDocument();
        expect(womensClothingLink).toHaveAttribute('href', '/store/womensclothing');

        const jeweleryLink = await screen.findByRole('link', { name: "Jewelery"});
        expect(jeweleryLink).toBeInTheDocument();
        expect(jeweleryLink).toHaveAttribute('href', '/store/jewelery');

        const electronicsLink = await screen.findByRole('link', { name: "Electronics"});
        expect(electronicsLink).toBeInTheDocument();
        expect(electronicsLink).toHaveAttribute('href', '/store/electronics');

        const searchField = await screen.findByRole('search');
        expect(searchField).toBeInTheDocument();
    });

    it('search field should submit when typing', async () => {
        const router = createRouter(['/store']);
        const user = userEvent.setup();

        const submit = vi.fn();
        useSubmit.mockReturnValue(submit);
        
        render(<RouterProvider router={router} />);

        const searchField = await screen.findByLabelText('search-item');
        const form = await screen.findByRole('search');
        await user.type(searchField, 'jac');
        expect(submit).toHaveBeenCalledWith(form);
        expect(submit).toHaveBeenCalledTimes(3);
    })
});

describe('store card component', () => {
    it('should render cards', async () => {
        const router = createRouter(['/store']);
        render(<RouterProvider router={router} />);

        const cards = await screen.findAllByTestId('card');
        expect(cards).toHaveLength(2);
    });

    it('should render first card correclty', async() => {
        const router = createRouter(['/store']);
        render(<RouterProvider router={router} />);

        const headers = await screen.findAllByTestId('card-title');
        expect(headers).toHaveLength(2);
        const [headerOne, headerTwo] = headers;
        expect(headerOne).toHaveTextContent('jacket');
        expect(headerTwo).toHaveTextContent('skirt');

        const images = await screen.findAllByRole('img');
        expect(images).toHaveLength(2);
        const [imageOne, imageTwo] = images;
        expect(imageOne).toHaveAttribute('src', 'http://example.com');
        expect(imageTwo).toHaveAttribute('src', 'http://example.com');

        const prices = await screen.findAllByLabelText('price');
        expect(prices).toHaveLength(2);
        const [priceOne, priceTwo] = prices;
        expect(priceOne).toHaveTextContent('0.1');
        expect(priceTwo).toHaveTextContent('0.5');

        const buttons = await screen.findAllByRole('button');
        expect(buttons).toHaveLength(4);
        const [minusButtonOne, plusButtonOne, minusButtonTwo, plusButtonTwo] = buttons;
        expect(minusButtonOne).toHaveTextContent('-');
        expect(plusButtonOne).toHaveTextContent('+');
        expect(minusButtonTwo).toHaveTextContent('-');
        expect(plusButtonTwo).toHaveTextContent('+');

        const quantities = await screen.findAllByLabelText('quantity');
        expect(quantities).toHaveLength(2);
        const [quantityOne, quantityTwo] = quantities;
        expect(quantityOne).toHaveTextContent('2');
        expect(quantityTwo).toHaveTextContent('3');

        const cartNotification = await screen.findByLabelText('total-items');
        expect(cartNotification).toBeInTheDocument();
        expect(cartNotification).toHaveTextContent('5');
    });
});

describe('addToCart buttons', async() => {
    it('should call removeFromCart and addToCart with correct objects when respective buttons clicked', async() => {
        const router = createRouter(['/store']);
        const user = userEvent.setup();
        render(<RouterProvider router={router} />);

        const buttons = await screen.findAllByRole('button');
        const [minusButtonOne, plusButtonOne, minusButtonTwo, plusButtonTwo] = buttons;

        await user.click(minusButtonOne);
        expect(removeFromCart).toHaveBeenCalledTimes(1);
        expect(removeFromCart).toHaveBeenCalledWith({
            id: 0,
            title: "jacket",
            price: 0.1,
            description: "confy",
            category: "clothes",
            image: "http://example.com"
        });

        await user.click(plusButtonOne);
        expect(addToCart).toHaveBeenCalledTimes(1);
        expect(addToCart).toHaveBeenCalledWith({
            id: 0,
            title: "jacket",
            price: 0.1,
            description: "confy",
            category: "clothes",
            image: "http://example.com"
        });

        await user.click(minusButtonTwo);
        expect(removeFromCart).toHaveBeenCalledTimes(2);
        expect(removeFromCart).toHaveBeenCalledWith({
            id: 1,
            title: "skirt",
            price: 0.5,
            description: "beautiful",
            category: "clothes",
            image: "http://example.com"
        });


        await user.click(plusButtonTwo);
        expect(addToCart).toHaveBeenCalledTimes(2);
        expect(addToCart).toHaveBeenCalledWith({
            id: 1,
            title: "skirt",
            price: 0.5,
            description: "beautiful",
            category: "clothes",
            image: "http://example.com"
        });
    });
});

describe('links to ProductPage', () => {
    it('should navigate to "/store/products/:productId when image or title clicked', async () => {
        const router = createRouter(['/store']);
        const user = userEvent.setup();

        const navigate = vi.fn();
        useNavigate.mockReturnValue(navigate);

        render(<RouterProvider router={router} />);
    
        const imgs = await screen.findAllByRole('img');
        const [imageOne, imageTwo] = imgs;

        await user.click(imageOne);
        expect(navigate).toHaveBeenCalledTimes(1);
        expect(navigate).toHaveBeenCalledWith('/store/products/0');

        await user.click(imageTwo);
        expect(navigate).toHaveBeenCalledTimes(2);
        expect(navigate).toHaveBeenCalledWith('/store/products/1');

        const titles = await screen.findAllByTestId('card-title');
        const [titleOne, titleTwo] = titles;

        await user.click(titleOne);
        expect(navigate).toHaveBeenCalledTimes(3);
        expect(navigate).toHaveBeenCalledWith('/store/products/0');

        await user.click(titleTwo);
        expect(navigate).toHaveBeenCalledTimes(4);
        expect(navigate).toHaveBeenCalledWith('/store/products/1');
    });
});