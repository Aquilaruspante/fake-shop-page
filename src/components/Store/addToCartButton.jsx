import { addToCart, removeFromCart } from "../../cartManager";
import { useFetcher } from "react-router";
import styles from './Card.module.css';
import { ShoppingCart } from "lucide-react";

export async function action({ request }) {
    const formData = await request.formData();
    const item = JSON.parse(formData.get('item'));
    const type = formData.get('type');
    
    if (type === 'add') {
        addToCart(item);
    } else if (type === 'remove') {
        removeFromCart(item);
    };
};

export default function AddToCartButton({ item, cart }) {
    const fetcher = useFetcher();
     
    let cartItem = null;
    if (cart) cartItem = cart.find(el => el.id === item.id);
    
    let quantity;

    if (cartItem) {
        quantity = cartItem.quantity;
    }
   
    return (
        <>
            <fetcher.Form 
                className={styles.formButton}
                method="POST">
                    <input name='item' value={JSON.stringify(item)} hidden={true} readOnly={true} />
                    <button name='type' value='remove' type='submit'>-</button>
            </fetcher.Form>
            {quantity && <span aria-label="quantity" className={styles.quantity}>{quantity}</span>}
            <ShoppingCart size={15} strokeWidth={3}/>
            <fetcher.Form 
                className={styles.formButton}
                method='POST'>
                    <input name='item' value={JSON.stringify(item)} hidden={true} readOnly={true} />
                    <button name='type' value='add' type='submit'>+</button>
            </fetcher.Form>   
        </>
    );
};