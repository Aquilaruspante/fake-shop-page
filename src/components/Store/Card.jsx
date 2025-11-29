import styles from './Card.module.css';
import AddToCartButton from './addToCartButton';

export default function Card({ item, cart }) {

    return(
        <div data-testid='card' className={styles.card}>
            <img src={item.image} alt={item.title} />
            <h2 data-testid='card-title' className={styles.montserratRegular}>{item.title.slice(0, 40)}...</h2>
            <div className={styles.lastLine}>
                <p aria-label='price' className={styles.price}>{item.price} $</p>
                <div className={styles.btn}>
                    <AddToCartButton item={item} cart={cart} />
                </div>
            </div>           
        </div>
    )
}