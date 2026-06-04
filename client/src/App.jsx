import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Landing from './pages/Landing';
import { ThemeProvider } from './context/ThemeContext';
import Templates from './pages/Templates';
import RecentlyGenerated from './pages/RecentlyGenerated';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Projects from './pages/Projects';
import Profile from './pages/Profile';
import SavedProjects from './pages/SavedProjects';
import Favorites from './pages/Favorites';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/app" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/templates" element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          } />
          <Route path="/recent" element={
            <ProtectedRoute>
              <RecentlyGenerated />
            </ProtectedRoute>
          } />
          <Route path="/saved-projects" element={
            <ProtectedRoute>
              <SavedProjects />
            </ProtectedRoute>
          } />
          <Route path="/favorites" element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          } />
          <Route path="/settings" element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          } />
          <Route path="/projects" element={
            <ProtectedRoute>
              <Projects />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
