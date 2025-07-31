import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu.jsx';
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