import styles from './Store.module.css';
import { useLoaderData, Form, useNavigation, NavLink } from "react-router";
import Card from "./Card";

export async function loader({ request }) {
    const url = new URL(request.url);
    const category = url.searchParams.get('cat');

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
                <NavLink className={styles.a} to={'/store'}>All</NavLink>
                <NavLink className={styles.a} to={'/store?cat=mensclothing'}>Men's clothing</NavLink>
                <NavLink className={styles.a} to={'/store?cat=womensclothing'}>Women's clothing</NavLink>
                <NavLink className={styles.a} to={'/store?cat=jewelery'}>Jewelery</NavLink>
                <NavLink className={styles.a} to={'/store?cat=electronics'}>Electronics</NavLink>
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