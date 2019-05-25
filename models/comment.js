var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    articleId: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model("Comment", schema);