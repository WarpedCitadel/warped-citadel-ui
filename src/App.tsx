import { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app-container">
      <Navbar onNavigate={setCurrentPage} />

      {currentPage === 'home' && <Home />}
      {currentPage === 'login' && <Login />}
    </div>
  );
}

export default App;