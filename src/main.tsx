import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { SettingsProvider } from "./components/context/SettingsContext";
import { AchievementProvider } from "./components/context/AchievementContext";
import { NotificationProvider } from "./components/context/NotificationContext";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <AchievementProvider>
        <NotificationProvider>
            <App/>
          </NotificationProvider>
      </AchievementProvider>
    </SettingsProvider>
  </StrictMode>,
)
