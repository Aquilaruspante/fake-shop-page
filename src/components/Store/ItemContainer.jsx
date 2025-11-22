import { useLoaderData, useNavigation, useOutletContext } from "react-router";
import Card from "./Card";

export async function loader({ request, params }) {
    const url = new URL(request.url);
    const { category } = params;
    const query = url.searchParams.get('q');

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
    const data = await response.json();
    if (category) {
        console.log(postProcessedCategory);
        return data.filter(item => item.category === postProcessedCategory)
    }
    if (query) {
        const filteredData = data.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        return filteredData;
    }
    return data;
} 

export default function ItemContainer() {
    const data = useLoaderData();
    const navigation = useNavigation();
    const cart = useOutletContext()

    const isLoading = navigation.state === 'loading';

    return (
        isLoading ? <p>Loading...</p> :
        <>
            {data.map((item) => (
                <li key={item.id}><Card item={item} cart={cart} /></li>
            ))}
        </>
    )
}