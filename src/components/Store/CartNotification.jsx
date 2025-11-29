import styles from './CartNotifications.module.css';

export default function CartNotifications ({ cart }) {
    const quantity = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity;
    }, 0);

    return <div aria-label='total-items' className={quantity ? styles.notifications : `${styles.notifications} ${styles.hidden}` }>{quantity}</div>
};