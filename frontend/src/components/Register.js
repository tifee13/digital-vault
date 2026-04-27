import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = ( { setUser } ) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] =useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (isLoading) return;
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/users/register', { username, email, password });
            const userData = response.data.user || response.data;
            setUser(userData);
            navigate('/');
        } catch (error){
            alert(error.response?.data?.message || "Registration Failed!");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-3xl relative overflow-hidden group">
                
                <div className="absolute top-0 left-0 w-full h-[2px] opacity-50 "></div>
                <div className="mb-10 text-center">
                    <h2 className="text-6xl font-medium tracking-tighter text-white bg-slate-500 bg-clip-text text-transparent mb-2">
                        My Vault
                    </h2>
                    <p className="text-slate-500 text-[11px] uppercase tracking-[0.2em] font-mono leading-relaxed">
                        <span className="text-cyan-500/90 font-bold font-cursive lowercase">share your experiences with others</span>
                    </p>
                </div>

                <div className="mb-6 flex items-center gap-2">
                    <div className="h-1 w-1 bg-cyan-500 rounded-full"></div>
                    <h3 className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
                    New Entry
                    </h3>
                </div>

                <form onSubmit={handleRegister} className="space-y-8">
                    <div className="space-y-1 relative">
                        <input 
                            type="text" 
                            placeholder="Username" 
                            className="w-full bg-transparent border-b border-slate-800 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-sm"
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                            disabled={isLoading}
                        />
                    </div>

                    <div className="space-y-1 relative">
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full bg-transparent border-b border-slate-800 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-sm"
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            disabled={isLoading}

                        />
                    </div>

                    <div className="space-y-1 relative">
                        <input 
                            type="password" 
                            placeholder="Set Access Key" 
                            className="w-full bg-transparent border-b border-slate-800 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 font-mono text-sm"
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            disabled={isLoading}

                        />
                    </div>

                    <button 
                        type="submit" 
                        disabled={isLoading}
                        className={`w-full font-black py-4 rounded-xl uppercase text-xs tracking-[0.2em] 
                            ${isLoading 
                                ? "bg-slate-700 text-slate-400 cursor-not-allowed" 
                                : "bg-white text-black hover:bg-cyan-400 hover:scale-[1.02] active:scale-95"
                            }`}
                    >
                        {isLoading ? "Creating..." : "Create Identity"}
                    </button>
                </form>

                <div className="mt-10 text-center border-t border-white/5 pt-6">
                    <p className="text-slate-500 text-[10px] uppercase tracking-wider">
                        Already Registered? 
                        <Link to="/login" className="ml-2 text-white hover:text-cyan-400 underline underline-offset-4">
                            Access Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;