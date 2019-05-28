var express = require('express');
var router = express.Router();
var Article = require('../models/article');
var Comment = require('../models/comment');
var passport = require('passport');
Like = require('../models/like');

router.get('/create', isLoggedIn, (req, res) => {
    res.render('createArticle')
})

router.get('/make/:id', (req, res) => {
    console.log('router working');
    
    console.log(req.params.id);

    Like.find({articleId: req.params.id, userId: req.user.email}, (err, doc) => {
        if(err) throw err;
        console.log('before if');
        console.log(doc);

        if(doc === []){
            console.log('user already liked it');
            
            res.json({status: true});
        } else {
            console.log('user dont like it');
            // store user in database
            var like = new Like({
                articleId: req.param.id,
                userId: req.user.email
            });

            like.save((err, data) => {
                if(err) throw err;

                console.log(data);

                Article.findByIdAndUpdate(req.params.id, {$inc : {likes : 1}}, (err, data) => {
                    if (err) throw err;
            
                    console.log(data.userID);
                    res.json({status: false});
                    // res.redirect('/' + req.params.id)
                })
            } )
            
        }
    });

    
})

router.get('/:id',(req, res) => {
    Article.findById(req.params.id, (err, article) => {
        if(err) throw err;

        Comment.find({articleId: article._id}, (err, comment) => {
            res.render('single-blog', {article: article, comments: comment});
        });
    })
})

router.post('/addArticle',isLoggedIn, (req, res) => {

    console.log(req.body)
    var article = new Article({
        title: req.body.title,
        description: req.body.text1,
        author: req.user.email,
        category: req.body.category,
        date: Date.now(),
        imgPath: req.body.imageUrl,
        post: req.body.post
    });

    article.save((err, article) => {
        if(err) throw err;

        console.log(article);
        res.redirect('/');
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

function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();
  
    // if they aren't redirect them to the home page
    res.redirect('/');
  }
  

module.exports = router;