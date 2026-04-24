import { Note } from '../models/note.model.js';

const createNote = async (req, res) => {
    try{
        const {title, content} = req.body;

        if ( !title || !content ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const note = await Note.create({ title, content });
        return res.status(201).json({ message: "Note created sucessfully", note});

    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        return res.status(200).json( notes );
    
    } catch (error) {
        res.status(500).json({ message: "Internal server error"});
    }
};

const updateNote = async (req, res) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No update provided" });
        }

        const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note updated successfully", note });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id);

        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        res.status(200).json({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
};


export { createNote, getNotes, updateNote, deleteNote}