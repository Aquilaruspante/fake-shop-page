import Root from "../src/components/Root/Root";
import HomePage from "../src/components/HomePage/HomePage";
import Store from "../src/components/Store/Store";
import ItemContainer from "../src/components/Store/ItemContainer";
import { addToCart, removeFromCart } from "../src/cartManager";

const routes = [
    {
        path: '/',
        element: <Root />,
        loader: () => {
            return [
                {
                    id: 0,
                    title: 'jacket',
                    category: "men's clothing",
                    description: 'a jacket',
                    image: 'imageurl',
                    price: 34,
                    quantity: 2,
                },
                {
                    id: 1,
                    title: 'bracelet',
                    category: 'jewelery',
                    description: 'a bracelet',
                    image: 'braceletimage',
                    price: 233,
                    quantity: 3,
                },
            ];
        },
        children: [
            { 
                index: true,
                element: <HomePage />
            },
            {
                element: <Store />,
                children: [
                    {
                        path: 'store/:category?',
                        element: <ItemContainer />,
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
                        ),
                        action: async ({ request }) => {
                            const formData = await request.formData();
                            const item = JSON.parse(formData.get('item'));
                            const type = formData.get('type');
                            
                            if (type === 'add') {
                                addToCart(item);
                            } else if (type === 'remove') {
                                removeFromCart(item);
                            };
                        },
                    },
                ],
            }
        ]
    }
];

export default routes;