import styles from './Store.module.css';
import { Form, NavLink, Outlet, useSubmit, useOutletContext, useNavigation } from "react-router";
import { useState } from 'react';

export default function Store() {
    const submit = useSubmit();
    const cart = useOutletContext();
    const navigation = useNavigation();
    const [searchInput, setSearchInput] = useState('');

    function manageOnChange(e) {
        setSearchInput(e.target.value);
        submit(e.currentTarget.form); 
    };

    const isLoading = navigation.state === 'loading';

    return(
        <>
            <nav className={styles.secondHeader}>
                <NavLink 
                    className={({ isActive }) => isActive ? `active ${styles.a}` : styles.a} to={'/store'} onClick={() => setSearchInput('')}>All</NavLink>
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
                <Outlet context={{ cart, isLoading, setSearchInput }} />
            </>
        </>
        
    )

}