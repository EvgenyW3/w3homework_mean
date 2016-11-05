var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Movie = mongoose.model('Movie');
var Comment = mongoose.model('Comment');
var authorComments = require('./models/authorComments');
//Module for uploading images
var multer = require('multer');
//This conf is for preventing multer from giving name without extention
var storage = multer.diskStorage({
 destination: function(req, file, cb) {
 cb(null, 'public/images/')
 },
 filename: function(req, file, cb) {
 cb(null, file.originalname);
 }
});
//This variable will be used in post route to get an image from form
var upload = multer({
 storage: storage
});

//THIS TIME I USE .POPULATE TO IMPLEMENT CONNECTION BETWEEN DOCUMENTS!

/* MOVIE ROUTES START HERE */

/* GET all movies from db */
router.get('/movies', function(req, res, next) {
  Movie.find().populate('comments').exec(function(err, movies){
  	if(err) return next(err);
  	res.json(movies);
  });
});

/* POST create a new movie */
router.post('/movies', function(req, res, next) {
	var movie = new Movie(req.body);
	movie.save(function(err, movie){
		if(err) return next(err);
		res.json(movie);
	});

});

/* Route for preloading movie objects by ID 
*  No need to replicate same code across different functions
*/
router.param('movie', function(req, res, next, id) {
  var query = Movie.findById(id);

  query.exec(function (err, movie){
    if (err) return next(err);
    if (!movie) return next(new Error('can\'t find movie'));

    req.movie = movie;
    return next();
  });
});

/* GET movie by ID */
router.get('/movies/:movie', function(req, res){
	req.movie.populate('comments', function(err, movie){
		if(err) return next(err);
		res.json(req.movie);
	});
});

//Detele movie by id
router.delete('/movie/delete/:movie', function(req, res, next) { 
	var movie = req.movie;
    movie.remove(function(err) {
      if (err) return next(err);
            res.json(movie);
      }); 
});

/* COMMENT ROUTES START HERE */

/* Route for preloading comment objects by ID 
*  No need to replicate same code across different functions
*/
router.param('comment', function(req, res, next, id) {
  var query = Comment.findById(id);

  query.exec(function (err, comment){
    if (err) return next(err);
    if (!comment) return next(new Error('can\'t find comment'));

    req.comment = comment;
    return next();
  });
});

/*  Create a comment for a particular movie */

router.post('/movies/:movie/comments', function(req, res, next) {
	var comment = new Comment(req.body);
	comment.movie = req.movie;

	comment.save(function(err, comment){
		if(err) return next(err);

		req.movie.comments.push(comment);
		req.movie.save(function(err, movie){
			if(err) return next(err);
			res.json(comment);
		});
	});
});

//Detele comment by id
router.delete('/comment/delete/:comment', function(req, res, next) { 
	var comment = req.comment;
    comment.remove(function(err) {
      if (err) return next(err);
            res.json(comment);
      }); 
});

/* AUTHOR'S COMMENTS ROUTES START HERE */

/* Route for finding a particular author's comments list of objects by author */

router.get('/:author', function(req, res){
var author = req.params.author;
//Creating list for storing all authorComments objects
var ac = [];
  //Finding a all movies that a particular author has commented
var query = Movie.find().populate('comments').exec({'comments' :{$elemMatch: {'author' : author }}}, function(err, movies) {
      if(err) return next(err);
      if(!movies) return next(new Error('can\'t find any movies commented by this author'));
      /*Checking through all movies and if an author of a comment matches an author's name 
      that is passed with a link, then we create a new authorComments object with all parametres needed
      (such as movie title, rating, comment text and comment id(for deleting)) and adding them to an ac array. 
      WARNING! MAGIC IS GOING ON HERE!
      */
      for(var i in movies){
          for(var j in movies[i].comments){
            if(movies[i].comments[j].author === author){
                ac.push(new authorComments(movies[i].title, movies[i].comments[j].rating, movies[i].comments[j].comment, movies[i].comments[j]._id, author));
            };
          };
      };
      //returning author's comment list
      res.json(ac);
  });
});


/* ANGULAR MAIN ROUTE */
router.get('*', function(req, res) {
	res.sendfile('./public/index.html');
});

module.exports = router;