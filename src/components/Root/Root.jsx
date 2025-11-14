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
                        <NavLink to={'/'}>
                            {({ isActive }) => isActive
                                ? <House color='#ff7b54' aria-label='store' data-testid='store' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.4 : ''} />
                                : <House color='#ff7b54' aria-label='store' data-testid='store' />}
                        </NavLink>
                        <NavLink to={'/store'}>
                            {({ isActive }) => isActive 
                                ? <Handbag color='#ff7b54' aria-label='store' data-testid='store' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.4 : ''} />
                                : <Handbag color='#ff7b54' aria-label='store' data-testid='store' />}
                        </NavLink>
                        <NavLink to={'cart'}>
                            {({ isActive }) => isActive
                                ? <ShoppingCart color='#ff7b54' aria-label='store' data-testid='store' fill={isActive ? '#ff7b54' : ''} fillOpacity={isActive ? 0.4 : ''} />
                                : <ShoppingCart color='#ff7b54' aria-label='store' data-testid='store' />}
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