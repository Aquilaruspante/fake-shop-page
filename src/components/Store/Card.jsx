import styles from './Card.module.css';

export default function Card({ title, price, description, category, image }) {
    return(
        <div data-testid='card' className={styles.card}>
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{price}</p>
        </div>
    )
}