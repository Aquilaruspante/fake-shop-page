import { useRouteError } from "react-router";
import styles from './ErrorPage.module.css';

export default function ErrorPage() {
    const error = useRouteError();

    return (
        <div className={styles.errorContainer}>
            <h2 aria-label="status">{error.status}</h2>
            <p aria-label="error message">{error.data}</p>
        </div>
    )
}