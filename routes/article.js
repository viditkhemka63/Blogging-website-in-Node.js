var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Comment = require('../models/comment');

router.get('/create', (req, res) => {
    res.render('createArticle')
})

router.get('/:id',(req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if(err) throw err;

        Comment.find({articleId: article._id}, (err, comment) => {
            res.render('single-blog', {article: article, comments: comment});
        });
    })
})

router.get('/single/foo', (req, res) => {
    res.render('single-blog');
})

router.post('/addArticle', (req, res) => {

    var article = new Article({
        title: req.body.title,
        description: req.body.description,
        author: req.body.author,
        category: req.body.category,
        date: Date.now(),
        imgPath: req.body.imageUrl
    });

    article.save((err, article) => {
        if(err) throw err;

        console.log(article);
        res.redirect('/archive');
    });
});

router.get("/find", (req,res) => {
    Article.find({}, (err, article) => {
        if(err) throw err;

        res.json(article);
    })
});

router.get("/find/:title", (req,res) => {
    Article.find({title: req.params.title}, (err, article) => {
        if(err) throw err;

        res.json(article);
    })
});

// not complete
router.post("/update/:title", (req, res) => {
    Article.findOneAndUpdate({title: req.params.title}, (err, res) => {

    })
})

module.exports = router;