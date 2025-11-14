import Root from "../src/components/Root/Root";
import HomePage from "../src/components/HomePage/HomePage";

const routes = [
    {
        path: '/',
        element: <Root />,
        children: [
            { 
                index: true,
                element: <HomePage />
            },
            {
                path: '/store',
                element: 'store',
                loader: () => (
                    [
                        {
                            id: 0,
                            title: "jacket",
                            price: 0.1,
                            description: "confy",
                            category: "clothes",
                            image: "http://example.com"
                        },
                        {
                            id: 1,
                            title: "skirt",
                            price: 0.5,
                            description: "beautiful",
                            category: "clothes",
                            image: "http://example.com"
                        },

                    ]
                )
            }
        ]
    }
];

export default routes;