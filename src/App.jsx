import { useState, useContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Settings } from "lucide-react";
import "./App.css";

// Routes
import Achievements from "./components/views/Achievements";
import Timer from "./components/views/Timer.jsx";
import Statistics from "./components/views/Statistics";
import Shop from "./components/views/Shop.jsx"; 

// Global overlays
import NotificationDisplay from "./components/notification/NotificationDisplay";
import SettingsOverlay from "./components/views/Settings";

// Tutorial Overlay
import TutorialContent from "./components/views/TutorialOverlay.jsx";
import TutorialOverlay from "./components/tutorial/Tutorial.jsx";

// Context APIs
import { SettingsContext } from "./context/SettingsContext.jsx";
import { StatisticsContext } from "./context/StatisticsContext.jsx";
import { GameContext } from "./context/GameContext.jsx";
import { AchievementContext } from "./context/AchievementContext.jsx";


function App() {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const { colorTheme, isOnBreak, showTutorial, setShowTutorial} = useContext(SettingsContext);
    const { checkStatisticsAvailability, checkMonthlyAvailability, storeTimeTracked, breakDownMonthlyStatistics} = useContext(StatisticsContext);
    const { checkGameStats, currencies } = useContext(GameContext);
    const { checkAchievements } = useContext(AchievementContext);
    const shop = isOnBreak ? "Shop" : "";

    // Used to check the user's statistics and initiate them if none is available
    useEffect(() => {
        checkStatisticsAvailability();
        checkMonthlyAvailability();
        storeTimeTracked();
        breakDownMonthlyStatistics();
        checkGameStats();
        checkAchievements();
    }, [checkStatisticsAvailability, checkMonthlyAvailability, storeTimeTracked, breakDownMonthlyStatistics, checkGameStats, checkAchievements ]);

    useEffect(() => {
        // Set the theme on the <html> element based on the current colorTheme
        document.documentElement.setAttribute('data-theme', colorTheme);
    }, [colorTheme]);

    useEffect(() => {
        
    }, []);

    return (
        <>
            <Router>
                <nav className="navbar">
                    {/* Clicking the icon toggles the settings overlay */}
                    <Settings onClick={() => setIsSettingsOpen(true)} className="settings" />
                    <Link to="/">Home</Link>
                    <Link to="/statistics">Statistics</Link>
                    <Link to="/achievements">Achievements</Link>
                    <Link to="/shop">{shop}</Link>

                    <nav className={ isOnBreak ? "navbar-child" : "hidden" }>   
                        {/* Dynamically display currencies with icons */}
                        <div className="tutorial-button-container">
                        <img src="/tutorial.png" alt="tutorialButton" className="tutorial-button" onClick={() => setShowTutorial(true)}/>
                        </div>
                        {currencies.map((currency) => (
                            <div key={currency.name} className="currency-item">
                                <img src={currency.icon} alt={currency.name} className={`${currency.name}`}/>
                                <span>: {currency.value}</span>
                            </div>
                        ))}
                    </nav>
                </nav>

                <div>
                {showTutorial && (
                    <TutorialOverlay onClose={() => setShowTutorial(false)}>
                    {TutorialContent}
                    </TutorialOverlay>
                )}
                </div>

                <Routes>
                    <Route path="/" element={<Timer />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path={`/${shop}`} element={<Shop />} />
                </Routes>
            </Router>

            {/* Render overlay when isSettingsOpen is true */}
            {isSettingsOpen && (
                <SettingsOverlay closeSettings={() => setIsSettingsOpen(false)} />
            )}
            <NotificationDisplay />
        </>
    );
}

export default App;
