import { useLoaderData, useOutletContext } from "react-router";
import { useEffect } from "react";
import Card from "./Card";
import styles from './Store.module.css';
import LoadingPage from "../Loading/LoadingPage";

export async function loader({ request, params }) {
    const url = new URL(request.url);
    const { category } = params;
    const query = url.searchParams.get('q') || '';

    let postProcessedCategory;

    switch (category) {
        case 'mensclothing':
            postProcessedCategory = "men's clothing";
            break;
        case 'womensclothing':
            postProcessedCategory = "women's clothing";
            break;
        case 'jewelery':
            postProcessedCategory = "jewelery";
            break;
        case 'electronics':
            postProcessedCategory = 'electronics';
            break;
    };


    const response = await fetch('https://fakestoreapi.com/products');
    if (!response.ok) {
        throw new Response('', {
            status: 404,
            statusText: 'Failed to fetch data',
        });
    };

    const data = await response.json();
    if (category) {
        if (!postProcessedCategory) {
            throw new Response('', {
                status: 404,
                statusText: 'Oops... wrong category!!!',
            });
        };
        const filteredData = data.filter(item => item.category === postProcessedCategory);
        
        return { filteredData, query };
    }
    if (query) {
        const filteredData = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));

        return { filteredData, query };
    }

    const filteredData = data;
    return { filteredData, query };
} 

export default function ItemContainer() {
    const { filteredData, query } = useLoaderData();
    const { cart, isLoading, setSearchInput } = useOutletContext();

    useEffect(() => {
        setSearchInput(query);
    }, [query]);

    return ( 
        <>
            {isLoading ? <LoadingPage /> :
            <ul className={styles.container}>
                {filteredData.length 
                    ?
                filteredData.map((item) => (
                    <li key={item.id}><Card item={item} cart={cart} /></li>
                )) 
                :
                <p className={styles.noResultsMessage}>Oops... your query didn't find any item</p>}
            </ul>}
        </>
    )
}