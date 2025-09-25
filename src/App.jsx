import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import DayDetails from "./components/DayDetails";
import HelpPage from "./components/HelpPage";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
          <Route path="/:part/:secret" element={<MainPage />} />
          <Route path="/pomoc" element={<HelpPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
