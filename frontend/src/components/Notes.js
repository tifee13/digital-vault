import { useEffect, useState } from 'react';
import axios from 'axios';
  
const Notes = ({ user, setUser }) => {
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState('');
    const [editId, setEditId] = useState(null); 
    const [content, setContent] = useState('');
    
    const fetchNotes = async () => {
    const response = await axios.get('http://localhost:5000/api/notes/getNotes');
    setNotes(response.data);
  }
  useEffect(() => {
    fetchNotes();
   }, []);

   const addNotes = async (e) => {
    e.preventDefault();
    const newNote = { title, content };
    await axios.post('http://localhost:5000/api/notes/create', newNote);
    setTitle('');
    setContent('');
    fetchNotes();
   };

    const handleUpdate = async (id) => {
        if (!title || !content) {
            alert("Please enter a title and content to update.");
            return;
        }

        try {
            await axios.put(`http://localhost:5000/api/notes/update/${id}`, { 
                title, 
                content 
            });

            setTitle('');
            setContent('');
            
            fetchNotes(); 
            alert("Note updated successfully!");
        } catch (error) {
            console.error("The update failed:", error);
        }
    };




   const handleLogout = () => {
    setUser(null);
  };

   return (
    <div className="Notes">
        <span>Welcome, {user?.username} </span>
        <button onClick={handleLogout}>Logout</button>
        
        <h1>MY DIARY </h1>
        <form onSubmit= {addNotes}>
        <input 
            placeholder='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
        <textarea 
            placeholder='Content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
        />
        <button type='submit'>Add Note</button>
        
        </form>

        <div className="note-list">
        <h1 className='note-head'>All Notes</h1>
        {notes.map((note) => (
            <div key={note.id} className="note">
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button onClick={() => handleUpdate(note.id)}>Update Note</button>

            </div>
        ))}
        </div>
    </div>
   )
}
export default Notes;