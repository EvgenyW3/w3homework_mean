angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController',
		})

		.when('/movie/:id', {
			templateUrl: 'views/comment.html',
			controller: 'CommentController'
		})

		.when('/comments/:author', {
			templateUrl: 'views/author.html',
			controller: 'AuthorController'	
		});

	$locationProvider.html5Mode(true);

}]);