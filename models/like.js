var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    articleId: {
        type: String,
        required: true,
    },      
    userId: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Like", schema);