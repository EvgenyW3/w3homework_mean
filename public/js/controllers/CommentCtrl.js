angular.module('CommentCtrl', []).controller('CommentController', function($scope, $http, $routeParams) {

	$scope.formData = {};

	//Initializing star-rating for movie
    $scope.stars = function(rating) {
    	$('.movieRating').rating({displayOnly: true, step: 0.1, size:'xs'});
    	$('.movieRating').rating('update', rating);
    };

	var id = $routeParams.id;
	$http.get('/movies/' + id)
			.success(function(data) {
				$scope.movie = data;
				//Rating magic in now in Angular!!!
					var rating = 0;
			        //Looping through particular movie's all comments
			        //Summarizing all ratings and deviding with comments length
			          for(i in $scope.movie.comments){
			              rating += $scope.movie.comments[i].rating / $scope.movie.comments.length;
			          }
			        //Setting rating to our scope object rounded to 1 decimal
			        $scope.movie.rating = rating.toFixed(1);
			        //Initializing stars after all data is received
					$scope.stars($scope.movie.rating);
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
		});
		/*$scope.movie.comments.splice(index, 1) works fine,
	* but if you delete an item from the middle(it deletes the right one from db),
	* it only deletes the last one from movies array,
	* so I decided to use this refresh magic after success delete
	*/
	$scope.refresh = function(){
		$http.get('/movies/' + id)
		.success(function(data) {
			$scope.movie = data;
			//Rating magic in now in Angular!!! Duplicated from above, need for updating rating after newly created comments
				var rating = 0;
		        //Looping through particular movie's all comments
		        //Summarizing all ratings and deviding with comments length
		          for(i in $scope.movie.comments){
		              rating += $scope.movie.comments[i].rating / $scope.movie.comments.length;
		          }
		        $scope.movie.rating = rating.toFixed(1);
				$scope.stars($scope.movie.rating);
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	$scope.createComment = function(id) {
		$http.post('/movies/'+id+'/comments', $scope.formData)
		.success(function(data) {
			$scope.formData = {};
			//If successed clear all error messages
			$scope.authorError = '';
			$scope.ratingError = '';
			$scope.commentError = '';

			//$scope.movie.comments.push(data);   no need for this since we refresh after comment creation
			$('.modal').modal('toggle');
			//This is for updating rating after comment is created
			//The function is on back-end, but I'm going to move it to Angular soon
			$scope.refresh();
			$scope.stars($scope.movie.rating);
			console.log(data);
		})
		.error(function(data){
		//Simple validation check for each input
		if(!$scope.formData.author || $scope.formData.author === '') {
			return $scope.authorError = 'Please enter your name';
		}else if(!$scope.formData.rating || $scope.formData.rating === ''){
			return $scope.ratingError = 'Please rate the movie';
		}else if(!$scope.formData.comment || $scope.formData.comment === ''){
			return $scope.commentError = 'Please enter your comment';
		}else{
			console.log('Error: ' + data);
			};
		});
	};

	$scope.deleteComment = function(id) {
		$http.delete('/comment/delete/' + id)
		.success(function(data) {
			//Deleting the element and refreshing the scope
			$scope.refresh();
			$scope.stars($scope.movie.rating);
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

});