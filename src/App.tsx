import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activate from './pages/Activate';
import Navbar from './components/Navbar';
import GameProfile from './pages/GameProfile';
import './App.css';
import Profile from './pages/UserProfile';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/activate" element={<Activate />} />
         <Route path="/gameProfile/:uuid" element={<GameProfile />} />
         <Route path="/user/:username" element={<Profile />} /> 
         <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </div>
  );
}

export default App;