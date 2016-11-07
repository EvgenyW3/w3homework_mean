angular.module('MainCtrl', []).controller('MainController', function($scope, $http) {


	/* All AngulaJS magic runs here!
	*  $http requests to back-end are also here and not in services
	*  I know it's a bad practise, but I just want to keep things simple
	*/
	//Empty scope object for form data
	$scope.formData = {};

	//Initializing star-rating for movie
	//Finaly made it to work with newly created movies
    $scope.stars = function() {
    angular.element(document).ready(function () {
    	$('.movieRating').rating({displayOnly: true, step: 0.1, size:'xs'});
    });
    };

	$http.get('/movies')
		.success(function(data) {
			$scope.movies = data;
			//Rating magic moved from back-end to Angular!
            //Looping through all movies
            for(var i in $scope.movies){
                //Creating a variable that takes a rating of each movie
                var rating = 0;
                //Looping throguh all movie's comments and getting ratings
                for(var j in $scope.movies[i].comments){
                    //Summarizing all ratings and deviding with comments length
                    rating += $scope.movies[i].comments[j].rating / $scope.movies[i].comments.length;
                    }
            //adding each movie's rating in our array
            $scope.movies[i].rating = rating.toFixed(1);
            }
            $scope.stars();
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	/*$scope.movies.splice(index, 1) works fine,
	* but if you delete an item from the middle(it deletes the right one from db),
	* it only deletes the last one from movies array,
	* so I decided to use this refresh magic after success delete
	*/
	$scope.refresh = function(){
		$http.get('/movies')
		.success(function(data) {
			$scope.movies = data;
			//Rating magic from above for new newly created movies
            //Looping through all movies
            for(var i in $scope.movies){
                //Creating a variable that takes a rating of each movie
                var rating = 0;
                //Looping throguh all movie's comments and getting ratings
                for(var j in $scope.movies[i].comments){
                    //Summarizing all ratings and deviding with comments length
                    rating += $scope.movies[i].comments[j].rating / $scope.movies[i].comments.length;
                    }
            //adding each movie's rating in our array
            $scope.movies[i].rating = rating.toFixed(1);
            }
            $scope.stars();
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});
	};

	$scope.createMovie = function() {
		$http.post('/movies', $scope.formData)
		.success(function(data) {
			$scope.formData = {};
			//If successed clear all error messages
			$scope.titleError = '';
			$scope.genreError = '';
			$scope.descriptionError = '';
			$scope.movies.push(data);
			$scope.stars();
			$('.modal').modal('toggle');
			console.log(data);
		})
		.error(function(data){
		//Simple validation check for each input
		if(!$scope.formData.title || $scope.formData.title === '') {
			return $scope.titleError = 'Please enter movie title';
		}else if(!$scope.formData.genre || $scope.formData.genre === ''){
			return $scope.genreError = 'Please enter movie genre';
		}else if(!$scope.formData.description || $scope.formData.description === ''){
			return $scope.descriptionError = 'Please enter movie description';
		}else{
			console.log('Error: ' + data);
		}
			$scope.error = 'All fields are required!';
			console.log('Error: ' + data);
		})
	};

	$scope.deleteMovie = function(id) {
		$http.delete('/movie/delete/' + id)
		.success(function(data) {
			//This var is for finding position of an element in movies arrays by it's mongodb id
			var index = $scope.movies.indexOf(id);
			//Deleting the element and refreshing the scope
			$scope.refresh();
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

});