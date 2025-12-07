import { useLoaderData } from "react-router";
import CartCard from "./CartCard";
import styles from './CartCard.module.css';
import { fakeCheckout } from "../../cartManager";

export default function Cart() {
    const data = useLoaderData();

    let totalItems = 0;
    data.forEach((item) => {
        totalItems += item.quantity;
    });

    let totalPrice = 0;
    data.forEach((item) => {
        totalPrice += (item.quantity * item.price);
    });

    return (
        <div className={styles.outerContainer}>
            <ul className={styles.container}>
                {data.map((item) => <li key={item.id}><CartCard item={item} cart={data} /></li>)}
            </ul>
            <div className={styles.checkout} aria-label="checkout dialogue">
                <p aria-label="items total">Items: {totalItems}</p>
                <p aria-label="total price">Total: {totalPrice} $</p>
                <button onClick={fakeCheckout}>Checkout</button>
            </div>
        </div>
        
    )
}