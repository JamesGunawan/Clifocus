import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SettingsProvider } from "./context/SettingsContext";
import { AchievementProvider } from "./context/AchievementContext";
import { NotificationProvider } from "./context/NotificationContext";
import { StatisticsProvider } from "./context/StatisticsContext.jsx";
import { GameProvider } from "./context/GameContext.jsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <GameProvider>
        <StatisticsProvider>
            <AchievementProvider>
              <NotificationProvider>
              <App/>
              </NotificationProvider>
            </AchievementProvider>
        </StatisticsProvider>
      </GameProvider>
    </SettingsProvider>
  </StrictMode>,
)
