const express = require('express');
const authenticate = require('../middlewares/auth');
const Note = require('../models/note');
const router = express.Router();

// search users notes
router.get('/', authenticate, async (req, res) => {
    const user_id = req.user.id;
    const query = req.query.q;

    if (!query) {
        return res.status(400).json({ message: "Search must contain a query" });
    }

    try {
        const notes = await Note.find({ 
            user_id, 
            $or: [
                {title: {$regex: query}}, 
                {content: {$regex: query}}
            ]
        });

        if (notes.length === 0) {
            return res.status(400).json({ message: "No notes found" });
        }

        res.status(200).json({ notes });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;