import { useState } from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import { Navigate, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes.js';
import NotFound from './components/NotFound.js';

function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });

  const handleSetUser = (userData) => {
    if (userData) {
      localStorage.setItem('user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('user');
    }
    setUser(userData);
  };

  return (
    <div className="bg-[#08122e] text-cyan-400 min-h-screen w-full flex justify-center">
      <Routes>
        <Route path="/" element={user ? <Notes user={user} setUser={handleSetUser} /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setUser={handleSetUser} />} />
        <Route path="/register" element={<Register setUser={handleSetUser} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;