var chai = require('chai');
var chaiHttp = require('chai-http');
var Movie = require('../app/models/movies.js');
//This is to run mocha tests in test enviroment and force it to use different database
process.env.NODE_ENV = 'test';
var server = require('../server');
var should = chai.should();

chai.use(chaiHttp);


describe('Movies', function() {

Movie.collection.drop();

beforeEach(function(done){
	var newMovie = new Movie({
		fileName: 'somefile.jpg',
		title: 'Test',
		genre: 'Test',
		description: 'Test',
		rating: 0,
		comments: []
	});
	newMovie.save(function(err){
		done();
	});
});

afterEach(function(done){
	Movie.collection.drop();
	done();
});

  it('should list ALL movies on /movies GET', function(done){
  	chai.request(server)
  		.get('/movies')
  		.end(function(err, res){
  			res.should.have.status(200);
  			res.should.be.json;
  			res.body.should.be.a('array');
  			res.body[0].should.have.property('_id');
  			res.body[0].should.have.property('fileName');
  			res.body[0].should.have.property('title');
  			res.body[0].should.have.property('genre');
  			res.body[0].should.have.property('description');
  			res.body[0].should.have.property('rating');
  			res.body[0].should.have.property('comments');
  			res.body[0].fileName.should.equal('somefile.jpg');
  			res.body[0].title.should.equal('Test');
  			res.body[0].genre.should.equal('Test');
  			res.body[0].description.should.equal('Test');
  			res.body[0].rating.should.equal(0);
  			res.body[0].comments.should.be.a('array');
  			done();
  		});
  });

  it('should list a SINGLE movie on /movies/:id GET', function(done){
  	var newMovie = new Movie({
		fileName: 'newfile.jpg',
		title: 'Test1',
		genre: 'Test1',
		description: 'Test1',
		rating: 0,
		comments: []
	});
	newMovie.save(function(err, data){
		chai.request(server)
		.get('/movies/'+data.id)
		.end(function(err, res){
			res.should.have.status(200);
			res.should.be.json;
			res.body.should.be.a('object');
			res.body.should.have.property('_id');
			res.body.should.have.property('fileName');
  			res.body.should.have.property('title');
  			res.body.should.have.property('genre');
  			res.body.should.have.property('description');
  			res.body.should.have.property('rating');
  			res.body.should.have.property('comments');
  			res.body._id.should.equal(data.id);
  			res.body.fileName.should.equal('newfile.jpg');
  			res.body.title.should.equal('Test1');
  			res.body.genre.should.equal('Test1');
  			res.body.description.should.equal('Test1');
  			res.body.rating.should.equal(0);
  			res.body.comments.should.be.a('array');
  			done();
		});
	});
  });

  it('should add a SINGLE movie on /movies POST', function(done){
  	chai.request(server)
  		.post('/movies')
  		.send({'fileName': 'cat.jpg', 'title' : 'Cat', 'genre': 'Comedy', 'description': 'My cat', 'rating': 0, 'comments': []})
  		.end(function(err, res){
  			res.should.have.status(200);
  			res.should.be.json;
  			res.body.should.be.a('object');
  			res.body.should.have.property('fileName');
  			res.body.should.have.property('title');
  			res.body.should.have.property('genre');
  			res.body.should.have.property('description');
  			res.body.should.have.property('rating');
  			res.body.should.have.property('comments');
  			res.body.comments.should.be.a('array');
  			res.body.fileName.should.equal('cat.jpg');
  			res.body.title.should.equal('Cat');
  			res.body.genre.should.equal('Comedy');
  			res.body.description.should.equal('My cat');
  			res.body.rating.should.equal(0);
  			done();
  		});
  });
  it('should delete a SINGLE movie on /movie/delete/:id DELETE', function(done){
  	chai.request(server)
  		.get('/movies')
  		.end(function(err, res){
  			chai.request(server)
  				.delete('/movie/delete/'+res.body[0]._id)
  				.end(function(error, response){
  					response.should.have.status(200);
  					response.should.be.json;
  					response.body.should.be.a('object');
  					response.body.should.have.property('fileName');
		  			response.body.should.have.property('title');
		  			response.body.should.have.property('genre');
		  			response.body.should.have.property('description');
		  			response.body.should.have.property('rating');
		  			response.body.should.have.property('comments');
		  			response.body.fileName.should.equal('somefile.jpg');
		  			response.body.title.should.equal('Test');
		  			response.body.genre.should.equal('Test');
		  			response.body.description.should.equal('Test');
		  			response.body.rating.should.equal(0);
		  			response.body.comments.should.be.a('array');
		  			done();
  				});
  		});
  });
});