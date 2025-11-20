import styles from './Store.module.css';
import { Form, NavLink, Outlet } from "react-router";

export default function Store() {
    return(
        <>
            <nav className={styles.secondHeader}>
                <NavLink 
                    className={({ isActive }) => isActive ? `active ${styles.a}` : styles.a} to={'/store'}>All</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/mensclothing'}>Men's clothing</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/womensclothing'}>Women's clothing</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/jewelery'}>Jewelery</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/electronics'}>Electronics</NavLink>
                <Form 
                    className={styles.form}
                    role="search">
                    <input aria-label='search-item' type="search" placeholder='Search Item...' name='q'/>
                </Form>
            </nav>
            <ul className={styles.container}>
                <Outlet />
            </ul>
            
        </>
        
    )

}