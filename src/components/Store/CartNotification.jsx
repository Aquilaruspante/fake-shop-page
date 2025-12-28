import styles from './CartNotifications.module.css';

export default function CartNotifications ({ cart, isMenuActive }) {
    let quantity = 0;

    if (cart) {
        quantity = cart.reduce((accumulator, currentValue) => {
            return accumulator + currentValue.quantity;
        }, 0);
    }

    return <div aria-label='total-items' className={quantity && !isMenuActive ? styles.notifications : `${styles.notifications} ${styles.hidden}`}>{quantity}</div>
};