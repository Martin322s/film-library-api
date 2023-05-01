const mongoose = require('mongoose');

const publicationSchema = new mongoose.Schema({
    title: {
        type: String, 
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true,
    },
    trailerUrl: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    _ownerId: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Publication = mongoose.model('Publication', publicationSchema);

module.exports = Publication;