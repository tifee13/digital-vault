import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = ( { setUser } ) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
            setUser(response.data.user);

            navigate('/');
        } catch (error){
            alert(error.response?.data?.message || "Registration Failed!");

        }
    };

    return (
        <div className='auth-box'>
            <h2>Create Account</h2>
            <form onSubmit = {handleRegister}>
                <input placeholder="username" onChange= {(e) => setUsername(e.target.value)} required />
                <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Join Us</button>    
            </form>
            <p>Have an account? <Link to="/login">Login here</Link></p>
        </div>
    );


};

export default Register;