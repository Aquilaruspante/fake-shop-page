import styles from './Store.module.css';
import { useLoaderData, Form, useNavigation } from "react-router";
import Card from "./Card";

export async function loader() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    return data;
} 

export default function Store() {
    const data = useLoaderData();
    const navigation = useNavigation()

    if (navigation.state === 'loading') { console.log('loading'); return <p>Loading...</p>; }

    return(
        <>
            <Form>
                <input type="search" />
            </Form>
            <ul className={styles.container}>
                {data.map((item) => (
                    <li key={item.id}><Card title={item.title} price={item.price} description={item.description} category={item.category} image={item.image} /></li>
                ))}
            </ul>
        </>
        
    )

}