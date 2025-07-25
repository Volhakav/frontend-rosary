import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu.jsx';
import MysterySection from './components/MysterySection.jsx';
import DailySection from './components/DailySection.jsx';
import DayDetails from './components/DayDetails.jsx'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Menu />
        
        <main>
          <Routes>
            <Route path="/" element={
              <>
                <MysterySection />
                <DailySection />
              </>
            } />
            <Route path="/day/:dayId" element={<DayDetails />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;