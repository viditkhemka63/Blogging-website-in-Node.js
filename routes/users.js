var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Article = require('../models/article');

var passport = require('passport');
var User = require('../models/user');

/* GET users listing. */
router.post('/addComment/:id', (req, res) => {
  console.log('comment router start');

  console.log(req.body);
  console.log(req.params.id);

  var comment = new Comment({
    articleId: req.params.id,
    authorId:  req.body.email,
    comment: req.body.comment,
    date: Date.now()
  })

  comment.save((err, data) => {
    if(err){
      console.log(err);
    } else {
      console.log(data);
      res.redirect('/' + req.params.id);
    }
  })

})

router.post('/search', (req, res) => {
  console.log(req.body);
  
  Article.find({
    "$text": {
      "$search": req.body.search
    }
  },{score: {$meta: 'textScore'}}, (err, data) => {
    if(err) {
      console.log(err);
    } else{
      console.log(data);
      res.render('archive', {articles: data});
    }
  })
})

router.get('/login', (req, res) => {
  res.render('login.ejs');
})

router.post('/login', passport.authenticate('local-login',{
  successRedirect : '/',  
  failureRedirect : '/login'
}));



router.get('/signup', (req, res) => {
  res.render('signup.ejs');
})

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/signup',
}))


router.get('/profile', isLoggedIn, function(req, res) {

  //console.log(req.user);
  res.render('profile.ejs', {
      user : req.user
  });
});


router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});


function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
      return next();

  // if they aren't redirect them to the home page
  res.redirect('/');
}

module.exports = router;
