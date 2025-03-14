import { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Settings } from "lucide-react";
import "./App.css";

// Routes
import Achievements from "./components/views/Achievements";
import Timer from "./components/views/Timer";
import Statistics from "./components/views/Statistics";

// Global overlays
import NotificationDisplay from "./components/notification/NotificationDisplay";
import SettingsOverlay from "./components/views/Settings";

// Context APIs
import { SettingsContext } from "./context/SettingsContext.jsx";
import { StatisticsContext } from "./context/StatisticsContext.jsx";


function App() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { colorTheme } = useContext(SettingsContext);
    const { checkStatisticsAvailability } = useContext(StatisticsContext);

    // Used to check the user's statistics and initiate them if none is available
    useEffect(() => {
        checkStatisticsAvailability();
    })

    useEffect(() => {
      // Set the theme on the <html> element based on the current colorTheme
      document.documentElement.setAttribute('data-theme', colorTheme);
    }, [colorTheme]);
    
    return (
        <>
            <Router>
                <nav className="navbar">
                    {/* Clicking the icon toggles the settings overlay */}
                    <Settings onClick={() => setIsSettingsOpen(true)} className="settings" />
                    <Link to="/">Home</Link>
                    <Link to="/statistics">Statistics</Link>
                    <Link to="/achievements">Achievements</Link>
                </nav>

                <Routes>
                    <Route path="/" element={<Timer/>}/>
                    <Route path="/statistics" element={<Statistics/>}/>
                    <Route path="/achievements" element={<Achievements/>}/>
                </Routes>
            </Router>

            {/* Render overlay when isSettingsOpen is true */}
            {isSettingsOpen && (
                <SettingsOverlay closeSettings={() => setIsSettingsOpen(false)} />
            )}

            <NotificationDisplay/>
        </>
    );
}

export default App;
