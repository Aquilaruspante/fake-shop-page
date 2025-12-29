import styles from './CartCard.module.css';
import AddToCartButton from '../Store/addToCartButton';
import cardStyles from '../Store/Card.module.css';
import { useNavigate } from 'react-router';

export default function CartCard({ item, cart }) {
    const navigate = useNavigate();

    return (
        <div className={styles.productCard} aria-label="product card">
            <div className={styles.leftSide}>
                <img className={styles.image} src={item.image} alt="item image" onClick={() => navigate(`/store/products/${item.id}`)}/>
            </div>
            <div className={styles.rightSide}>
                <h2 aria-label="title" className={styles.cardTitle} onClick={() => navigate(`/store/products/${item.id}`)}>{item.title.slice(0, 40)}...</h2>
                <p aria-label='price' className={styles.cardPrice}>Price: {item.price} $</p>
                <div className={styles.lastLine}>
                    <div className={styles.quantity}>Quantity: {item.quantity}</div>
                    <div aria-label='total'>Total: {parseFloat(item.price).toFixed(2) * item.quantity} $</div>
                    <div className={cardStyles.btn}>
                        <AddToCartButton item={item} cart={cart} />
                    </div>
                </div>
            </div>
        </div>
    )
}