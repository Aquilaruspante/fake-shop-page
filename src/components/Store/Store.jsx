import styles from './Store.module.css';
import { Form, NavLink, Outlet, useSubmit, useOutletContext, useNavigation } from "react-router";

export default function Store() {
    const submit = useSubmit();
    const cart = useOutletContext();
    const navigation = useNavigation();

    const isLoading = navigation.state === 'loading';

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
                    role="search"
                    action='/store'>
                    <input aria-label='search-item' type="search" placeholder='Search Item...' name='q' onChange={(e) => { submit(e.currentTarget.form) }}/>
                </Form>
            </nav>
            <>
                <Outlet context={{ cart, isLoading }} />
            </>
        </>
        
    )

}