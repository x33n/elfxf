angular.module('cloverApp', []).
	controller('ProjectsController', function($scope, $http){
	$http.get('../projects/projectsdb.json').success(function(data){
		$scope.projects = data;
		console.log($scope.projects);
	});
});

