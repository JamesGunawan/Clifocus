import Timer from "./components/views/Timer";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import useFocusTimer from "./components/hooks/UseFocusTimer";
import "./App.css"
import Analytics from "./components/views/Analytics";

function App() {

  const { trackNavbar } = useFocusTimer(); // Extract trackNavbar inside App

  return (
    <>
    <Router>
      <nav className={trackNavbar}>
        <Link to="/">Home</Link>
        <Link to="/analytics">Analytics</Link>
        <Link to="/">Feedback</Link>
        <Link to="/">Settings</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Timer/>} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/" element={<Timer/>} />
        <Route path="/" element={<Timer/>} /> 
      </Routes>
    </Router>
    </>
  )
}

export default App
