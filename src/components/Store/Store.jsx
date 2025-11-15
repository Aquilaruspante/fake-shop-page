import styles from './Store.module.css';
import { useLoaderData, Form, useNavigation, NavLink } from "react-router";
import Card from "./Card";

export async function loader() {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    console.log(data);
    return data;
} 

export default function Store() {
    const data = useLoaderData();
    const navigation = useNavigation()

    if (navigation.state === 'loading') { console.log('loading'); return <p>Loading...</p>; }

    return(
        <>
            <div className={styles.secondHeader}>
                <NavLink className={styles.a}>Men's clothing</NavLink>
                <NavLink className={styles.a}>Women's clothing</NavLink>
                <NavLink className={styles.a}>Jewelery</NavLink>
                <NavLink className={styles.a}>Electronics</NavLink>
                 <Form className={styles.form}>
                    <input type="search" placeholder='Search Item...'/>
                </Form>
            </div>
            <ul className={styles.container}>
                {data.map((item) => (
                    <li key={item.id}><Card title={item.title} price={item.price} description={item.description} category={item.category} image={item.image} /></li>
                ))}
            </ul>
        </>
        
    )

}