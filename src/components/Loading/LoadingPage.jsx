import styles from './LoadingPage.module.css';

export default function LoadingPage() {
    return (
        <div className={styles.container}>
            <p aria-label='loading screen'>Loading...</p>
        </div>
    );
};