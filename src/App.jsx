import Timer from "./components/views/Timer";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css"
import SettingsFunction from "./components/settings/SettingsContext";
import Feedback from "./components/views/Feedback";
import { Settings } from "lucide-react";
import SettingsTemp from "./components/views/Settings";
import Statistics from "./components/views/Statistics";

function App() {
  return (
    <>
    <Router>
      <nav className="navbar">
        <SettingsFunction/>
        
        <Link to="/">Home</Link>
        <Link to="/statistics">Statistics</Link>
        <Link to="/feedback">Feedback</Link>
        <Link to="/settings">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Timer/>} />
        <Route path="/statistics" element={<Statistics/>} />
        <Route path="/feedback" element={<Feedback/>} />
        <Route path="/settings" element={<SettingsTemp/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
