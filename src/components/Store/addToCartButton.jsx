import { addToCart } from "../../cartManager";
import { useFetcher } from "react-router";
import styles from './Card.module.css';
import { ShoppingCart } from "lucide-react";

export async function action({ request }) {
    const formData = await request.formData();
    const item = JSON.parse(formData.get('item'));
    
    addToCart(item);
};

export default function AddToCartButton({ item }) {
    const fetcher = useFetcher();

    return (
        <>
            <fetcher.Form className={styles.formButton}>
                -
            </fetcher.Form>
            <ShoppingCart size={15} strokeWidth={3}/>
            <fetcher.Form 
                className={styles.formButton}
                method='POST'>
                    <input name='item' value={JSON.stringify(item)} hidden={true} readOnly={true} />
                    <button type='submit'>+</button>
            </fetcher.Form>   
        </>
    );
};