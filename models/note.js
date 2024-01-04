const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
});

module.exports = mongoose.model('Note', noteSchema);