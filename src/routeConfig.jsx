import Root, {loader as cartLoader } from "./components/Root/Root.jsx"
import HomePage from "./components/HomePage/HomePage.jsx";
import Store from "./components/Store/Store.jsx";
import ItemContainer, { loader as itemLoader} from "./components/Store/ItemContainer.jsx";
import { action as addToCartAction } from "./components/Store/addToCartButton.jsx";
import Cart from './components/Cart/cart.jsx';
import ProductPage, { loader as productLoader } from './components/ProductPage/ProductPage.jsx';

const routes = [
    {
        path: '/',
        element: <Root />,
        loader: cartLoader,
        children: [
            { 
                index: true,
                element: <HomePage />
            },
            {
                element: <Store />,
                children: [
                    {
                        path: 'store/products/:productId',
                        element: <ProductPage />,
                        loader: productLoader,
                        action: addToCartAction,
                    },
                    {
                        path: 'store/:category?',
                        element: <ItemContainer />,
                        loader: itemLoader,
                        action: addToCartAction,
                    },
                ],
            },
            {
                path: 'cart',
                element: <Cart />,
                loader: cartLoader,
            }
        ]
    }
];

export default routes;