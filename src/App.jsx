import Timer from './components/views/Timer';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <>
    <Router>
      <nav className="navbar">
        <Link to="/">Home</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Timer/>} />
      </Routes>
    </Router>
    </>
  )
}

export default App
