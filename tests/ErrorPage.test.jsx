import { screen, render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import ErrorPage from '../src/components/ErrorPage/ErrorPage.jsx';
import mockRouterConfing from './mockRouteConfig.jsx';

describe('errorPage', () => {
    it('should render error page correctly', async() => {
        const router = createMemoryRouter(mockRouterConfing, {
            initialEntries: ['/blablabla']
        });
        render(<RouterProvider router={router} />);

        const errorMessage = await screen.findByLabelText('error message');
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent('Error: No route matches URL "/blablabla"');

    });
});