const express = require('express');
const router = express.Router();
const Note = require('../models/note');
const authenticate = require('../middlewares/auth');

// get all notes for user
router.get('/', authenticate, async (req, res) => {
    try {
        const user_id = req.user.id;
        const notes = await Note.find({ user_id });
        res.status(200).json({ notes });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// get specific note for user
router.get('/:id', authenticate, async (req, res) => {
    try {
        const user_id = req.user.id;
        const _id = req.params.id;
        const note = await Note.findOne({ user_id, _id });

        if (!note) {
            return res.status(400).json({ message: `No note found with id ${_id}` });
        }

        res.status(200).json({ note });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// add new note for user
router.post('/', authenticate, async (req, res) => {
    const { title, content } = req.body;

    if (!title || !content) {
        res.status(300).json({ message: "Notes must contain a title and content." });
    }

    try {
        const note = new Note({ title, content, user_id: req.user.id });
        await note.save();
        res.status(201).json({ message: "Note Saved"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
});

// update note for user
router.put('/:id', authenticate, async (req, res) => {
    const { title, content } = req.body;
    const _id = req.params.id;
    const user_id = req.user.id;
    const query = { _id, user_id };
    try {
        const updatedNote = await Note.findOneAndUpdate(query, { title, content });
        res.status(201).json({ message: "Note Updated" });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
});

// delete note for user
router.delete('/:id', authenticate, async (req, res) => {
    const _id = req.params.id;
    const user_id = req.user.id;

    try {
        const deletedNote = await Note.findOneAndDelete({ user_id, _id });
        if (!deletedNote) {
            return res.status(400).json({ message: `No note found with id ${_id}` });
        }
        res.status(201).json({ message: "Note Deleted"});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// share note for user
router.post('/:id/share', authenticate, (req, res) => {
    res.send('SHARE');
});

module.exports = router;