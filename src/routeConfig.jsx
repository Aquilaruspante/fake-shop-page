import Root from "./components/Root/Root.jsx"
import HomePage from "./components/HomePage/HomePage.jsx";
import Store from "./components/Store/Store.jsx";
import ItemContainer, { loader as itemLoader} from "./components/Store/ItemContainer.jsx";

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
                element: <Store />,
                children: [
                    {
                        path: 'store/:category?',
                        element: <ItemContainer />,
                        loader: itemLoader,
                    }
                ]
            }
            
        ]
    }
];

export default routes;