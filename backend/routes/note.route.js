import express from 'express';
import { Note } from '../models/note.model.js';
import { createNote, deleteNote, getNotes, updateNote } from '../controller/note.controller.js';

const router = express.Router();

router.get('/getNotes', getNotes);
router.post('/create', createNote );
router.patch('/update/:id', updateNote);
router.delete('/delete/:id', deleteNote);

export default router;