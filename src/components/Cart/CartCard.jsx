import styles from './CartCard.module.css';
import AddToCartButton from '../Store/addToCartButton';
import cardStyles from '../Store/Card.module.css';

export default function CartCard({ item, cart }) {
    return (
        <div className={styles.productCard} aria-label="product card">
            <div className={styles.leftSide}>
                <img className={styles.image} src={item.image} alt="item image" />
            </div>
            <div className={styles.rightSide}>
                <h2 aria-label="title">{item.title}</h2>
                <p aria-label='price'>Price: {item.price} $</p>
                <div className={styles.lastLine}>
                    <div className={styles.quantity}>Quantity: {item.quantity}</div>
                    <div aria-label='total'>Total: {parseInt(item.price) * item.quantity} $</div>
                    <div className={cardStyles.btn}>
                        <AddToCartButton item={item} cart={cart} />
                    </div>
                </div>
            </div>
        </div>
    )
}