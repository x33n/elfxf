angular.module('cloverApp', ['angularModalService', 'ngAnimate']).
	directive('onLastRepeat', function() {
		return function(scope, element, attrs) {
			if (scope.$last) setTimeout(function(){
				scope.$emit('onRepeatLast', element, attrs);
			}, 1);
		};
})

	.controller('ProjectsController', function($scope, ModalService, $http){
		$scope.projects = [];
		$scope.$on('onRepeatLast', function(scope, element, attrs){
			console.log("projects loaded");
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				//setWrapperSize: true,
				slidesPerView: 'auto',
				centeredSlides: true,
				paginationClickable: true,
				paginationType: 'fraction',
				nextButton: '.swiper-button-next',
				prevButton: '.swiper-button-prev',
				spaceBetween: 20,
				speed: 400,
				grabCursor: true,
				initialSlide: 1,
				preloadImages: false,
				//autoplay: 5000,
				slideToClickedSlide: true,
				lazyLoading: false,
				lazyLoadingInPrevNextAmount: 5,
				lazyLoadingOnTransitionStart: true,

			});

		});
		$http.get('../projects/projectsdb.json')
			.success(function(data){

				$scope.projects = data;

		});

		$scope.showProjectInfo = function(scope, project){
			//thit = $scope.projects[project];
			console.log($scope.project);
			ModalService.showModal({
				template: "<div id=\"custom-modal\"><div id=\"overlay\"><p>Раздел находится в разработке.<br>Информацию по проекту Вы можете получить по тел. +7 915-010-4940</p><a href ng-click=\"close()\">ОК</a></div><div id=\"fade\"></div></div>",
				controller: function($scope, close, $http){
					$scope.currentProject = [];
					$http.get('../projects/projectsdb.json')
						.success(function(data){

							$scope.currentProject = data;
							console.log($scope.currentProject);
						});
					$scope.close = close;
				},
				controllerAs: "projectInfo"

			});
		};
	});


