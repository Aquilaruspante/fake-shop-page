import styles from './Card.module.css';
import AddToCartButton from './addToCartButton';

export default function Card({ item }) {
    return(
        <div data-testid='card' className={styles.card}>
            <img src={item.image} alt={item.title} />
            <h2 className={styles.montserratRegular}>{item.title.slice(0, 40)}...</h2>
            <div className={styles.lastLine}>
                <p className={styles.price}>{item.price} $</p>
                <div className={styles.btn}>
                    <AddToCartButton item={item} />
                </div>
            </div>           
        </div>
    )
}