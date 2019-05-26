var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        text: true
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
    },
    post: [{
        type: String
    }]
    
});

module.exports = mongoose.model("Article", schema);