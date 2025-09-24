import { useState } from 'react';
import DayDetails from './DayDetails';
import MenuList from './MenuList';

export default function MainPage() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="container">
        <div>
            <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    ☰ Menu
                </button>
                <MenuList />
            </nav>
        </div>
        <main>
            <DayDetails/>
        </main>
    </div>
  );
}