const express = require("express");
const { body } = require("express-validator");
const { getAllNotes, createNote, updateNoteById, deleteNoteById, getNoteById } = require("../controllers/notes.controllers");
const protect = require("../middleware/auth.middleware");

const notesRouter = express.Router();

notesRouter.use(protect);

notesRouter.route("/")
    .get(getAllNotes)
    .post(
        [
            body("title")
                .notEmpty().withMessage("Title is required")
                .isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),
            body("content")
                .notEmpty().withMessage("Content is required")
                .isLength({ min: 10 }).withMessage("Content must be at least 20 characters"),
        ],
        createNote
    );

notesRouter.route("/:id")
    .put(
        [
            body("title")
                .optional()
                .isLength({ min: 5 }).withMessage("Title must be at least 5 characters"),
            body("content")
                .optional()
                .isLength({ min: 10 }).withMessage("Content must be at least 20 characters"),
        ],
        updateNoteById
    )
    .delete(deleteNoteById)
    .get(getNoteById);


module.exports = notesRouter;