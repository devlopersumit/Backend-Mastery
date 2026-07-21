import express from 'express';
import {
    createNote,
    deleteNote,
    getAllNotes,
    getNoteById,
    updateNote
} from '../controllers/notes.controllers.js';
import { verifyToken } from '../middlewares/auth.middleware.js';
import { noteValidator } from '../middlewares/validate.middleware.js';

const notesRouter = express.Router();

notesRouter.use(verifyToken);

notesRouter.post('/', noteValidator, createNote);
notesRouter.get('/', getAllNotes);
notesRouter.get('/:id', getNoteById);
notesRouter.put('/:id', noteValidator, updateNote);
notesRouter.delete('/:id', deleteNote);

export default notesRouter;
