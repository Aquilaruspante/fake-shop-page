import './root.css';
import { House, Handbag, ShoppingCart } from 'lucide-react';

export default function Root() {
    return (
        <header>
            <nav>
                <h1 className="logo roboto-condensed-font">Mocksy</h1>
                <div className="links">
                    <House color='#ff7b54' />
                    <Handbag color='#ff7b54' />
                    <ShoppingCart color='#ff7b54' />
                </div>
            </nav>
        </header>
    );
};