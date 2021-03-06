var express = require('express');
var router = express.Router();
var Article = require('../models/article');

/* GET home page. */
router.get('/', function(req, res, next) {
  Article.find({}).sort({date: -1}).exec((err, data) => {
    if(err) throw err;

    console.log(data);
    res.render('index', {articles: data});
  });
});

router.get('/archive', (req, res) =>{
  Article.find({}).sort({date: -1}).exec((err, data) => {
    if(err) throw err;

    console.log(data);
    res.render('archive', {articles: data});
  });
})

router.get('/contact', (req, res) => {
  res.render('contact');
})

router.get('/category', (req, res) => {
  res.render('category');
})

module.exports = router;
