import styles from './Store.module.css';
import { Form, NavLink, Outlet, useSubmit, useOutletContext, useNavigation, useSearchParams } from "react-router";
import { useEffect, useState } from 'react';

export default function Store() {
    const submit = useSubmit();
    const cart = useOutletContext();
    const navigation = useNavigation();
    const [searchInput, setSearchInput] = useState('');
    const { q } = useSearchParams();

    function manageOnChange(e) {
        setSearchInput(e.target.value); 
    };

    useEffect(() => {
        setSearchInput(q);
    }, [q]);

    useEffect(() => {
        const form = document.querySelector('form[role="search"]');
        if (!form) return;

        const timeOutId = setTimeout(() => {
            if (searchInput !== '') {
                submit(form, { replace: true });
            };
        }, 150);

        return () => clearTimeout(timeOutId);
    }, [searchInput, submit]);

    const isLoading = navigation.state === 'loading';

    return(
        <>
            <nav className={styles.secondHeader}>
                <NavLink className={({ isActive }) => isActive ? `active ${styles.a}` : styles.a} to={'/store'} onClick={() => setSearchInput('')}>All</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/mensclothing'} onClick={() => setSearchInput('')}>Men's clothing</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/womensclothing'} onClick={() => setSearchInput('')}>Women's clothing</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/jewelery'} onClick={() => setSearchInput('')}>Jewelery</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/electronics'} onClick={() => setSearchInput('')}>Electronics</NavLink>
                <Form 
                    className={styles.form}
                    role="search"
                    action='/store'>
                    <input aria-label='search-item' type="search" placeholder='Search Item...' name='q' value={searchInput} onChange={manageOnChange}/>
                </Form>
            </nav>
            <>
                <Outlet context={{ cart, isLoading }} />
            </>
        </>
        
    )

}