var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Comment = requie('./models/comment');

router.post('/addComment', (req, res) => {
    console.log('comment router start');

    console.log(req.body);

    res.send('dome');
})

module.exports = router;
