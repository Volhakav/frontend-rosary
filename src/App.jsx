import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import DayDetails from './components/DayDetails.jsx';
import HelpPage from './components/HelpPage.jsx'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Menu />
        
        <main>
          <Routes>
           
            <Route path="/dzien/:part/:secret/:dayId" element={<DayDetails />} />
            <Route path="/pomoc" element={<HelpPage />} /> 
          </Routes>
        </main>
      </div>
    </Router>
  );
}




export default App;