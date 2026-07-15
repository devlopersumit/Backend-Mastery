const express = require("express");
const { getAllNotes, createNote, updateNoteById, deleteNoteById, getNoteById } = require("../controllers/notes.controllers");

const notesRouter = express.Router();

notesRouter.route("/")
           .get(getAllNotes)
           .post(createNote);

 notesRouter.route("/:id")
            .put(updateNoteById)
            .delete(deleteNoteById)
            .get(getNoteById);


module.exports = notesRouter;