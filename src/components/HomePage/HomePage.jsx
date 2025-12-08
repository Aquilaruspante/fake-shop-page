import { useNavigate } from 'react-router';
import styles from './homePage.module.css';

export default function HomePage() {
    const navigate = useNavigate();

    return (
        <div className={`${styles.manropeFont} ${styles.homepageContainer}`}>
            <p className={styles.hero}>We guaratee the best prices on the market</p>
            <p className={styles.hero}>If you find it cheaper... well that shouldn't happen</p>
            <div className={styles.buttonContainer}>
                <button className={styles.btn} onClick={() => navigate('/store')}>Shop with us</button>
            </div>
        </div>
    )
}