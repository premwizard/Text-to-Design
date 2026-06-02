import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Landing from './pages/Landing';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/app" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
