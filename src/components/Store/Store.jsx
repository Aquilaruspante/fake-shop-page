import styles from './Store.module.css';
import { Form, NavLink, Outlet, useSubmit, useOutletContext, useNavigation, useSearchParams, useLocation, useFetcher } from "react-router";
import { useEffect, useState, useRef } from 'react';

export default function Store() {
    const submit = useSubmit();
    const cart = useOutletContext();
    const navigation = useNavigation();
    const [searchInput, setSearchInput] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const prevLocationRef = useRef(location.pathname);
    const prevSearchInputRef = useRef('');
    
    const q = searchParams.get('q') || '';

    function manageOnChange(e) {
        setSearchInput(e.target.value); 
    };

    useEffect(() => {
        const form = document.querySelector('form[role="search"]');
        if (!form) return;

        const timeOutId = setTimeout(() => {
            if (prevSearchInputRef.current !== searchInput) {    
                submit(form, { replace: true });
                prevSearchInputRef.current = searchInput;
            }
        }, 200);

        return () => {
            clearTimeout(timeOutId);
        }
    }, [searchInput, submit]);

    const isLoading = navigation.state === 'loading';

    return(
        <>
            <nav className={styles.secondHeader}>
                <NavLink className={({ isActive }) => isActive ? `active ${styles.a}` : styles.a} to={'/store'} >All</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/mensclothing'} >Men's clothing</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/womensclothing'} >Women's clothing</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/jewelery'} >Jewelery</NavLink>
                <NavLink className={({ isActive }) => isActive ? `${styles.active} ${styles.a}` : styles.a} to={'/store/electronics'} >Electronics</NavLink>
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