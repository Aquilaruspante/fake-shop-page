import './root.css';
import { useState } from 'react';
import { House, Handbag, ShoppingCart, Menu } from 'lucide-react';
import { Outlet, NavLink, useLoaderData, Link } from 'react-router';
import { getCart } from '../../cartManager';
import CartNotifications from '../Store/CartNotification';

export function loader() {
    return getCart();
};

export default function Root() {
    const cart = useLoaderData();
    const [isMenuActive, setIsMenuActive] = useState(false);

    function handleMenuClick() {
        setTimeout(() => {
            setIsMenuActive(!isMenuActive);
        }, 100);
    };

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
                    <Menu color='#ff7b54' aria-label='navigation menu' className='accordion-menu' onClick={handleMenuClick} />  
                    <div className={`dropdown ${isMenuActive ? '' : 'non-visible'}`}> 
                        <Link to='/' className='dropdown-item' ><p>Home</p><House color='#ff7b54' /></Link>
                        <Link to='/store' className='dropdown-item' ><p>Store</p><Handbag color='#ff7b54' /></Link>
                        <Link to='/cart' className='dropdown-item' ><p>Cart</p><ShoppingCart color='#ff7b54' /></Link>
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