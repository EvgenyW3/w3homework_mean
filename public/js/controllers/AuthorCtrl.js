angular.module('AuthorCtrl', []).controller('AuthorController', function($scope, $http, $routeParams) {

	var author = $routeParams.author;

		$http.get('/' + author)
			.success(function(data) {
				$scope.ac = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
		});
	//Bad practise again, but need to refresh after comment is deleted from middle of the list
	$scope.refresh = function() {
		$http.get('/' + author)
			.success(function(data) {
				$scope.ac = data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
		});
	};

	//Delete comment by ID duplicated from CommentCtrl
	$scope.deleteComment = function(id) {
		console.log('THIS' +id);
		$http.delete('/comment/delete/' + id)
		.success(function(data) {
			//Deleting the element and refreshing the scope
			$scope.refresh();
			console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	};

});