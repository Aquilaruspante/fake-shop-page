import Root from "./Root"
import HomePage from "./components/HomePage";

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            { 
                index: true,
                element: <HomePage />
            }
        ]
    }
];

export default routes;