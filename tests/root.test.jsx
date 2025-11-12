import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router';

import routeConfig from '../src/routeConfig.jsx';

describe('root', () => {
    it('should render the home page', async () => {
        const router = createMemoryRouter(routeConfig, {
            initialEntries: ['/']
        });

        render(<RouterProvider router={router} />);
        
        const title = await screen.findByText('Fake Shop');
        expect(title).toBeInTheDocument();
    });
});