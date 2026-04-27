import { useEffect, useState } from 'react';
import axios from 'axios';

const Notes = ({ user, setUser }) => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [editId, setEditId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [view, setView] = useState('all');

    const userId = user?._id || user?.id;

    const fetchNotes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/notes/getNotes');
            setNotes(response.data);
        } catch (error) {
            console.error("Failed to fetch notes:", error);
        }
    };

    useEffect(() => {
        fetchNotes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (editId) {
                await axios.patch(`http://localhost:5000/api/notes/update/${editId}`, {
                    title,
                    content,
                    userId  
                });
            } else {
                await axios.post('http://localhost:5000/api/notes/create', {
                    title,
                    content,
                    userId  
                });
            }
            setTitle('');
            setContent('');
            setEditId(null);
            fetchNotes();
        } catch (error) {
            console.error("Submission failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const startEdit = (note) => {
        setEditId(note._id);
        setTitle(note.title);
        setContent(note.content);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this note?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/notes/delete/${id}`, {
                data: { userId }
            });
            fetchNotes();
        } catch (error) {
            console.error("Could not delete note", error);
        }
    };

    const filteredNotes = notes.filter((note) => {
        if (view === 'mine') {
            return note.user === userId || note.user?.toString() === userId;
        }
        return true;
    });

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <div className="min-h-screen bg-[#030712] text-slate-300 font-mono">
            <nav className="border-b border-white/5 bg-white/5 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
                <div className="flex items-center gap-3">
                    <div className="h-2 w-2 bg-cyan-500 rounded-full"></div>
                    <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">My Vault</h1>
                </div>
                <div className="flex items-center gap-6">
                    <span className="text-[10px] uppercase tracking-wider">
                        <span className="text-cyan-400">Welcome, {user?.username}</span>
                    </span>
                    <button
                        onClick={handleLogout}
                        className="text-[10px] uppercase tracking-widest px-4 py-2 border border-white/10 rounded-xl hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/50 "
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto p-8 grid grid-cols-1 lg:grid-cols-12 gap-10">

                <div className="lg:col-span-4">
                    <div className="sticky top-28 bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-xl">
                        <h2 className="text-xs font-bold text-cyan-500 uppercase tracking-[0.3em] mb-6">
                            New Entry
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <input
                                placeholder='Entry Title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full bg-transparent border-b border-slate-800 py-2 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm"
                                required
                            />
                            <textarea
                                placeholder='Share your thoughts...'
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className="w-full bg-transparent border border-slate-800 p-4 rounded-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 text-sm min-h-[150px] resize-none"
                                required
                            />
                            <button
                                type='submit'
                                disabled={isLoading}
                                className="w-full bg-white text-black font-black py-4 rounded-xl hover:bg-cyan-400 transform hover:scale-[1.02] active:scale-95 uppercase text-[10px] tracking-wider"
                            >
                                {isLoading ? "Processing..." : (editId ? "Confirm Update" : "Save")}
                            </button>
                            {editId && (
                                <button
                                    type="button"
                                    onClick={() => { setEditId(null); setTitle(''); setContent(''); }}
                                    className="w-full py-2 text-[10px] uppercase tracking-wider text-slate-500 hover:text-slate-300"
                                >
                                    Cancel Edit
                                </button>
                            )}
                        </form>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="flex gap-8 mb-8 border-b border-white/5 pb-4">
                        <button
                            onClick={() => setView('all')}
                            className={`text-xs uppercase tracking-wider pb-1 ${view === 'all' ? 'text-cyan-400 border-b border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Global Feed
                        </button>
                        <button
                            onClick={() => setView('mine')}
                            className={`text-xs uppercase tracking-wider pb-1 ${view === 'mine' ? 'text-cyan-400 border-b border-cyan-400' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            Private Vault
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {filteredNotes.map((note) => {
                            const isOwner = note.user?.toString() === userId;

                            return (
                                <div key={note._id} className="group relative bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/[0.08] hover:border-cyan-500/50">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className="text-[9px] text-cyan-500/50 uppercase tracking-tighter">By: {note.username || 'Anonymous'}</span>
                                        <span className="text-[8px] text-slate-600">{new Date(note.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <h3 className="text-white font-bold mb-3 tracking-tight text-lg">{note.title}</h3>
                                    <p className="text-2xl text-slate-400 leading-tight mb-6">
                                        {note.content}
                                    </p>
                                    {isOwner && (
                                        <div className="flex gap-4 pt-4 border-t border-white/5">
                                            <button
                                                onClick={() => startEdit(note)}
                                                className="text-[9px] uppercase tracking-wider text-cyan-500 hover:text-cyan-300"
                                            >
                                                Overwrite
                                            </button>
                                            <button
                                                onClick={() => handleDelete(note._id)}
                                                className="text-[9px] uppercase tracking-wider text-red-500 hover:text-red-400"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>

                    {filteredNotes.length === 0 && (
                        <div className="text-center py-20 opacity-20">
                            <p className="uppercase text-[10px] tracking-wider">
                                {view === 'mine' ? 'You have no saved entries.' : 'No global entries.'}
                            </p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default Notes;