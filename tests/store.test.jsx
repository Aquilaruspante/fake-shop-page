import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { createMemoryRouter, RouterProvider, useSubmit } from 'react-router';
import userEvent from '@testing-library/user-event';
import mockRouteConfig from './mockRouteConfig';

vi.mock('react-router', async() => {
    const actual = await vi.importActual('react-router');

    return {
        ...actual,
        useSubmit: vi.fn(),
    };
});

function createRouter(entry) {
    return createMemoryRouter(mockRouteConfig, {
        initialEntries: entry,
    });
};

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

describe('store component', () => {
    it('should render cards', async () => {
        const router = createRouter(['/store']);
        render(<RouterProvider router={router} />);

        const cards = await screen.findAllByTestId('card');
        expect(cards).toHaveLength(2);
    })
})