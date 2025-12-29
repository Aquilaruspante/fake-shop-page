import './root.css';
import { useState, useRef, useEffect } from 'react';
import { House, Handbag, ShoppingCart, Menu } from 'lucide-react';
import { Outlet, NavLink, useLoaderData, Link, useLocation } from 'react-router';
import { getCart } from '../../cartManager';
import CartNotifications from '../Store/CartNotification';

export function loader() {
    return getCart();
};

export default function Root() {
    const cart = useLoaderData();
    const [isMenuActive, setIsMenuActive] = useState(false);
    const location = useLocation();
    const prevLocationRef = useRef(location.pathname);

    function handleMenuClick() {
        setTimeout(() => {
            setIsMenuActive(!isMenuActive);
        }, 100);
    };

    useEffect(() => {
        if (location.pathname !== prevLocationRef.current) {
            setIsMenuActive(false);
            prevLocationRef.current = location.pathname;
        }
    }, [location])

    return (
        <>
            <header>
                <nav>
                    <h1 className="logo dm-serif-text-regular">MOCKSI</h1>
                    <div className="links">
                        <NavLink className="nav-link" to={'/'} data-testid='home' aria-label='home link'>
                            {({ isActive }) => isActive
                                ? <House color='#ff7b54' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.3 : ''} />
                                : <House color='#ff7b54' />}
                        </NavLink>
                        <NavLink className="nav-link" to={'/store'} data-testid='store' aria-label='store link'>
                            {({ isActive }) => isActive 
                                ? <Handbag color='#ff7b54' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.3 : ''} />
                                : <Handbag color='#ff7b54' />}
                        </NavLink>
                        <div className='cart-and-notifications'>
                            <NavLink className="{nav-link" to={'cart'} data-testid='cart' aria-label='cart link'>
                            {({ isActive }) => isActive
                                ? <ShoppingCart color='#ff7b54' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.3 : ''} />
                                : <ShoppingCart color='#ff7b54' />}
                            </NavLink>
                            <CartNotifications cart={cart} />
                        </div>
                    </div>
                    <div className='accordion-container'>
                        <Menu color='#ff7b54' aria-label='navigation menu' className='accordion-menu' onClick={handleMenuClick} />
                        <CartNotifications cart={cart} isMenuActive={isMenuActive} />
                    </div>                             
                    <div className={`dropdown ${isMenuActive ? '' : 'non-visible'}`}> 
                        <Link to='/' className='dropdown-item' ><p>Home</p><House color='#ff7b54' /></Link>
                        <Link to='/store' className='dropdown-item' ><p>Store</p><Handbag color='#ff7b54' /></Link>
                        <Link to='/cart' className='dropdown-item' >
                            <p>Cart</p>
                            <div className='dropdown-cart'>
                                <ShoppingCart color='#ff7b54' />
                                <CartNotifications cart={cart} />
                            </div>
                        </Link>
                    </div>           
                </nav>
            </header>
            <main>
                <Outlet context={cart} />
            </main>
            <footer>
                <p>@Calogero-Salvaggio, <a href="https://github.com/Aquilaruspante">Github</a></p>
            </footer>
        </>
    );
};