import './root.css';
import { House, Handbag, ShoppingCart } from 'lucide-react';

export default function Root() {
    return (
        <header>
            <nav>
                <h1 className="logo roboto-condensed-font">Mocksy</h1>
                <div className="links">
                    <House color='#ff7b54' aria-label='home' data-testid='home' />
                    <Handbag color='#ff7b54' aria-label='store' data-testid='store' />
                    <ShoppingCart color='#ff7b54' aria-label='cart' data-testid='cart' />
                </div>
            </nav>
        </header>
    );
};