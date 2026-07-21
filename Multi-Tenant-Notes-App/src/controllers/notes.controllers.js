import Note from '../models/notes.models.js';

export const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user?.id;

        if (!userId) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        const note = await Note.create({ title, content, user: userId });

        return res.status(201).json({
            success: true,
            message: 'Note created successfully',
            note
        });
    } catch (error) {
        console.error('Create note error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getAllNotes = async (req, res) => {
    try {
        const userId = req.user?.id;

        const notes = await Note.find({ user: userId }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: notes.length,
            notes
        });
    } catch (error) {
        console.error('Get notes error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const getNoteById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const note = await Note.findOne({ _id: id, user: userId });

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        return res.status(200).json({ success: true, note });
    } catch (error) {
        console.error('Get note error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user?.id;

        const note = await Note.findOne({ _id: id, user: userId });

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        note.title = title || note.title;
        note.content = content || note.content;
        await note.save();

        return res.status(200).json({
            success: true,
            message: 'Note updated successfully',
            note
        });
    } catch (error) {
        console.error('Update note error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};

export const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;

        const note = await Note.findOneAndDelete({ _id: id, user: userId });

        if (!note) {
            return res.status(404).json({ success: false, message: 'Note not found' });
        }

        return res.status(200).json({
            success: true,
            message: 'Note deleted successfully'
        });
    } catch (error) {
        console.error('Delete note error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error' });
    }
};