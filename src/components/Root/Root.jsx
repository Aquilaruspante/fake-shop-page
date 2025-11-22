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
                        <NavLink className="nav-link" to={'/'}>
                            {({ isActive }) => isActive
                                ? <House color='#ff7b54' aria-label='store' data-testid='store' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.3 : ''} />
                                : <House color='#ff7b54' aria-label='store' data-testid='store' />}
                        </NavLink>
                        <NavLink className="nav-link" to={'/store'}>
                            {({ isActive }) => isActive 
                                ? <Handbag color='#ff7b54' aria-label='store' data-testid='store' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.3 : ''} />
                                : <Handbag color='#ff7b54' aria-label='store' data-testid='store' />}
                        </NavLink>
                        <NavLink className="{nav-link" to={'cart'}>
                            {({ isActive }) => isActive
                                ? <ShoppingCart color='#ff7b54' aria-label='store' data-testid='store' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.3 : ''} />
                                : <ShoppingCart color='#ff7b54' aria-label='store' data-testid='store' />}
                        </NavLink>
                        <CartNotifications cart={cart} />
                    </div>
                </nav>
            </header>
            <main>
                <Outlet context={cart} />
            </main>
        </>
    );
};