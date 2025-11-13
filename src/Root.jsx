import './root.css';
import { House, Handbag, ShoppingCart } from 'lucide-react';
import { Outlet, NavLink } from 'react-router';

export default function Root() {
    return (
        <>
            <header>
                <nav>
                    <h1 className="logo dm-serif-text-regular">Mocksy</h1>
                    <div className="links">
                        <NavLink 
                            to={'/'}
                            className={({ isActive, isPending }) => {
                                return isPending ? 'pending nav-element' : isActive ? 'active nav-element' : 'nav-element';
                            }} >
                            <House color='#ff7b54' aria-label='home' data-testid='home' />
                        </NavLink>
                        <NavLink to={'/store'}>
                            <Handbag color='#ff7b54' aria-label='store' data-testid='store' />
                        </NavLink>
                        <NavLink to={'cart'}>
                            <ShoppingCart color='#ff7b54' aria-label='cart' data-testid='cart' />
                        </NavLink>
                    </div>
                </nav>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    );
};