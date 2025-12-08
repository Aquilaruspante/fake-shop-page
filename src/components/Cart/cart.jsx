import { useLoaderData } from "react-router";
import CartCard from "./CartCard";
import styles from './CartCard.module.css';
import { fakeCheckout } from "../../cartManager";

export default function Cart() {
    const data = useLoaderData();

    let totalItems = 0;
    let totalPrice = 0;

    if (data) {
        data.forEach((item) => {
            totalItems += item.quantity;
        });

        data.forEach((item) => {
            totalPrice += (item.quantity * item.price);
        });
    };
    
    
    

    return (
        <div className={styles.outerContainer}>
            <ul className={styles.container}>
                {data && data.map((item) => <li key={item.id}><CartCard item={item} cart={data} /></li>)}
            </ul>
            <div className={styles.checkout} aria-label="checkout dialogue">
                <p aria-label="items total">Items: {totalItems}</p>
                <p aria-label="total price">Total: {parseFloat(totalPrice).toFixed(2)} $</p>
                <button onClick={fakeCheckout}>Checkout</button>
            </div>
        </div>
        
    )
}