angular.module('cloverApp', []).
	directive('onLastRepeat', function() {
		return function(scope, element, attrs) {
			if (scope.$last) setTimeout(function(){
				scope.$emit('onRepeatLast', element, attrs);
			}, 1);
		};
})



	.controller('ProjectsController', function($scope,  $http){
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
				lazyLoadingOnTransitionStart: true

			});

		});

		$http.get('../projects/projectsdb.json')
			.success(function(data){
				$scope.projects = data;
			});

		$scope.showProjectInfo = function(project){
			console.log("получено значение: " + project);

		};
	});


