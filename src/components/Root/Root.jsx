import './root.css';
import { House, Handbag, ShoppingCart } from 'lucide-react';
import { Outlet, NavLink, useLoaderData } from 'react-router';
import { getCart } from '../../cartManager';
import CartNotifications from '../Store/CartNotification';

export function loader() {
    return getCart();
};

export default function Root() {
    const cart = useLoaderData();

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
                </nav>
            </header>
            <main>
                <Outlet context={cart} />
            </main>
        </>
    );
};