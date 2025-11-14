import Root from "./components/Root/Root.jsx"
import HomePage from "./components/HomePage/HomePage.jsx";
import Store, { loader as storeLoader } from "./components/Store/Store.jsx";

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
                path: 'store',
                element: <Store />,
                loader: storeLoader,
            }
        ]
    }
];

export default routes;