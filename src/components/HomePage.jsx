import styles from './homePage.module.css';

export default function HomePage() {
    return (
        <>
            <p className={styles.hero}>We guaratee the best prices on the market</p>
            <p className={styles.hero}>If you find it cheaper we reimburse you</p>
            <div className={styles.buttonContainer}>
                <button className={styles.btn}>Shop with us</button>
            </div>
        </>
    )
}