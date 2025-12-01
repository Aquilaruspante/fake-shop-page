import { useLoaderData, useOutletContext } from "react-router";
import styles from './ProductPage.module.css';
import storeStyles from '../Store/Store.module.css';
import AddToCartButton from "../Store/addToCartButton";

export async function loader({ params }) {
    const { productId } =  params;
    const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
    const data = await response.json();
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

                <div className={storeStyles.lastLine}>
                    <div className={styles.price} aria-label="price">{data.price}$</div>
                    <AddToCartButton item={data} cart={cart} />
                </div>
                
            </div>
        </div>
    )
}