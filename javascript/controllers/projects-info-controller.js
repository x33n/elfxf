angular.module('cloverApp')
    .controller('ProjectsInfoController',['$scope', '$http', 'pkey', 'project', 'close', function($scope, $http, pkey, project, close){
        var controller = this;
        $scope.project = [];
        $http.get('/projects/projectsdb-new.json')
            .success(function(data){
                controller.projectData = data[pkey];
                $scope.project = controller.projectData;
                console.log("Имя: " + $scope.project.name);
            });
        $scope.close = close;
    }]);