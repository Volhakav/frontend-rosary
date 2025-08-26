import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import DayDetails from './components/DayDetails.jsx';
import HelpPage from './components/HelpPage.jsx'; // Nowy komponent
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Menu />
        
        <main>
          <Routes>
           
            <Route path="/day/:part/:secret/:dayId" element={<DayDetails />} />
            <Route path="/help" element={<HelpPage />} /> {/* Nowa ścieżka */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}




export default App;