import { useState } from 'react';
import './App.css';
import Login from './components/Login.js';
import Register from './components/Register.js';
import { Navigate, Route, Routes } from 'react-router-dom';
import Notes from './components/Notes.js';
import NotFound from './components/NotFound.js';


function App() {
  const [user, setUser] = useState(null)

  return (    
    <Routes>
      <Route path="/" element={user ? <Notes user={user} setUser={setUser} />  : <Navigate to="/login" />} />
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
      <Route path="*" element={<NotFound />} />

    </Routes>

   );
}
export default App;