const Notes = require("../models/notes.model")

// Fetch all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user._id });

        if (!notes) {
            return res.status(404).json({
                status: "failed",
                message: "No Notes Exist"
            });
        }

        return res.status(200).json({
            status: "Success",
            message: "All Notes Send Successfully",
            notes
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Inter Server Error: " + error.message
        });
    }
};

// Fetch a single note by ID
const getNoteById = async (req, res) => {
    try {
        const ID = req.params.id

        const singleNote = await Notes.findOne({ _id: ID, user: req.user._id });

        if (!singleNote) {
            return res.status(404).json({
                status: "failed",
                message: "Notes Does not exist"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Notes sent successfully",
            note: singleNote
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Inter Server Error: " + error.message
        });
    }
}

// Create a new note
const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || typeof title !== 'string' || title.trim() === "" ||
            !content || typeof content !== 'string' || content.trim() === "") {

            return res.status(400).json({
                status: "failed",
                message: "Please enter valid title and content"
            });
        }

        const newNote = await Notes.create({
            title: title.trim(),
            content: content.trim(),
            user: req.user._id
        });

        return res.status(201).json({
            status: "success",
            message: "Notes Created Successfully",
            notes: newNote
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Inter Server Error: " + error.message
        });
    }
};


// Update a note by ID
const updateNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || typeof title !== 'string' || title.trim() === "" ||
            !content || typeof content !== 'string' || content.trim() === "") {

            return res.status(400).json({
                status: "failed",
                message: "Please enter valid title and content"
            });
        }

        const updatedNote = await Notes.findOneAndUpdate({ _id: id, user: req.user._id }, {
            title: title.trim(),
            content: content.trim()
        }, { new: true });

        if (!updatedNote) {
            return res.status(404).json({
                status: "failed",
                message: "Note not exist"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Notes Updated successfully",
            updatedNote: updatedNote
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Inter Server Error: " + error.message
        });
    }
};

// Delete a note by ID
const deleteNoteById = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedNote = await Notes.findOneAndDelete({ _id: id, user: req.user._id });

        if (!deletedNote) {
            return res.status(404).json({
                status: "failed",
                message: "Note not exist"
            });
        }

        return res.status(200).json({
            status: "success",
            message: "Note Deleted Successfully"
        });
    } catch (error) {
        res.status(500).json({
            status: "Failed",
            message: "Inter Server Error: " + error.message
        });
    }
};

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNoteById,
    deleteNoteById
};
