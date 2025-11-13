import styles from './homePage.module.css';

export default function HomePage() {
    return (
        <div className={styles.manropeFont}>
            <p className={styles.hero}>We guaratee the best prices on the market</p>
            <p className={styles.hero}>If you find it cheaper... well that shouldn't happen</p>
            <div className={styles.buttonContainer}>
                <button className={styles.btn}>Shop with us</button>
            </div>
        </div>
    )
}