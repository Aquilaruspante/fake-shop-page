import { useLoaderData } from "react-router";
import CartCard from "./CartCard";
import styles from './CartCard.module.css';

export default function Cart() {
    const data = useLoaderData();

    return (
        <ul className={styles.container}>
            {data.map((item) => <li key={item.id}><CartCard item={item} cart={data} /></li>)}
        </ul>
    )
}