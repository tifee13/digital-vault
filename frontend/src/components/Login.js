import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = ( { setUser } ) => {
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
            
            const userData = response.data.user || response.data;
            
            setUser(userData);

            navigate('/');
        } catch (error){
            alert(error.response?.data?.message || "Login Failed!");

        }
    };

    return (
        <div className='auth-box'>
            <h2>Login here</h2>
            <form onSubmit = {handleLogin}>
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>    
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );


};

export default Login;