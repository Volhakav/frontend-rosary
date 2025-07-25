import { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuList from './MenuList';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <div>
            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    ☰ Menu
                </button>
                <MenuList />
            </nav>
        </div>
    );
}