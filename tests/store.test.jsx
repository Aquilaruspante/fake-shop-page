import { findByTestId, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createMemoryRouter, RouterProvider } from 'react-router';
import mockRouteConfig from './mockRouteConfig';

function createRouter(entry) {
    return createMemoryRouter(mockRouteConfig, {
        initialEntries: entry,
    });
};

describe('store component', () => {
    it('should render cards', async () => {
        const router = createRouter(['/store']);

        render(<RouterProvider router={router} />);

        const cards = await screen.findAllByTestId('card');
        expect(cards).toHaveLength(2);
    })
})