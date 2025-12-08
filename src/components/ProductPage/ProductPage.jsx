import { useLoaderData, useOutletContext } from "react-router";
import styles from './ProductPage.module.css';
import storeStyles from '../Store/Card.module.css';
import AddToCartButton from "../Store/addToCartButton";

export async function loader({ params }) {
    const { productId } =  params;
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    console.log('response', response.ok);
    if (!response.ok) {
        throw new Response('', {
            status: 404,
            statusText: 'Oops... Item Not Found!!!',
        });
    };
    try {
        const data = await response.json();
        console.log('data', data);

        if (!data || !data.id) {
            console.log('trhowing error now');
            throw new Response('', {
                status: 404,
                statusText: 'Oops... Item Not Found!!!',
            });
        }
    } catch (error) {
        throw new Response('', {
            status: 404,
            statusText: 'Oops... Item Not Found!!!',
        });
    };
    
    return data;
};

export default function ProductPage() {
    const data = useLoaderData();
    const cart = useOutletContext();

    return (
        <div className={styles.card}>
            <div className={styles.leftSide}>
                <img src={data.image} alt="product image" />
            </div>
            <div className={styles.rightSide}>
                <h2 aria-label="product title">{data.title}</h2>
                <div aria-label="description" className={styles.description}>{data.description}</div>

                <div className={`${storeStyles.lastLine} ${styles.productLastLine}`}>
                    <div className={styles.price} aria-label="price">{data.price}$</div>
                    <div className={storeStyles.btn}>
                        <AddToCartButton item={data} cart={cart} />
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
}