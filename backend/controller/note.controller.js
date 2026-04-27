import { Note } from '../models/note.model.js';
import { User } from '../models/user.model.js';

const createNote = async (req, res) => {
    try{
        const {title, content, userId} = req.body;

        if ( !title || !content || !userId ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const foundUser = await User.findById(userId);
        if (!foundUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const note = await Note.create({ title, content, user: foundUser._id, username: foundUser.username });

        return res.status(201).json({ message: "Note created successfully", note});

    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        return res.status(200).json( notes );
    
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

const updateNote = async (req, res) => {
    try {
        const { userId, ...updateFields } = req.body;

        if (Object.keys(updateFields).length === 0) {
            return res.status(400).json({ message: "No update provided" });
        }

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to update this note" });
        }

        const updated = await Note.findByIdAndUpdate(req.params.id, updateFields, { new: true });
        res.status(200).json({ message: "Note updated successfully", note: updated });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { userId } = req.body;

        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        if (note.user.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized to delete this note" });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Note deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

export { createNote, getNotes, updateNote, deleteNote };