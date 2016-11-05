var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var comment = new mongoose.Schema({
  	author: {type: String, required: true},
    rating: {type: Number, min: 0, max: 5, required: true},
    comment: {type: String, required: true},
  	movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie' }
});

mongoose.model('Comment', comment);