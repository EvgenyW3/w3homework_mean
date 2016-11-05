var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movie = new Schema({
	fileName: {type: String},
    title: {type: String, required: true},
    genre: {type: String, required: true},
    description: {type: String, required: true},
    //Rationg will be set up differently
    rating: {type: Number, default: 0},
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
});


module.exports = mongoose.model('Movie', movie);