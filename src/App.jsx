import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MenuList from './components/MenuList.jsx';
import DayDetails from './components/DayDetails.jsx';
import HelpPage from './components/HelpPage.jsx'; 
import MainPage from './components/MainPage.jsx';
import './App.css';



function App() {
  return (
    <Router>
        <Routes>
          <Route path="/:part/:secret" element={<MainPage />} />
          <Route path="/pomoc" element={<HelpPage />} />
          <Route path="/" element={<MainPage />} />
        </Routes>
    </Router>
  );
}

export default App;