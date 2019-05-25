var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    articleId: {
        type: String,
        required: true,
    },      
    description: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    imgPath: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    category: {
        type: String,
        required: true
    }
    
});

module.exports = mongoose.model("Like", schema);