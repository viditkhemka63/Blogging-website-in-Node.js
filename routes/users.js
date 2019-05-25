var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Article = require('../models/article');

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

router.get('/got', (req, res) => {
  Article.listIndexes((err, data) => {
    if(err) throw err;

    console.log(data);
  })
})

module.exports = router;
