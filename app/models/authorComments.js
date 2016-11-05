//This is for finding all author comments magic
//Constructor for creating an author's comments object
function authorComments(movie, rating, comment, commentId, author) {

  this.movie = movie;  
  this.rating = rating;  
  this.comment = comment;
  this.commentId = commentId;
  this.author = author;

}

// export the class
module.exports = authorComments;