import styles from './Card.module.css';
import { useFetcher } from 'react-router';
import { ShoppingCart } from 'lucide-react';

export default function Card({ title, price, description, category, image }) {
    const fetcher = useFetcher();

    return(
        <div data-testid='card' className={styles.card}>
            <img src={image} alt={title} />
            <h2 className={styles.montserratRegular}>{title.slice(0, 40)}...</h2>
            <div className={styles.lastLine}>
                <p className={styles.price}>{price} $</p>
                <div className={styles.btn}>
                    <fetcher.Form className={styles.formButton}>
                        -
                    </fetcher.Form>
                    <ShoppingCart size={15} strokeWidth={3}/>
                    <fetcher.Form className={styles.formButton}>
                        +
                    </fetcher.Form>
                </div>
            </div>           
        </div>
    )
}