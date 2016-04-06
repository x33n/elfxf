angular.module('cloverApp', []).
	directive('onLastRepeat', function() {
		return function(scope, element, attrs) {
			if (scope.$last) setTimeout(function(){
				scope.$emit('onRepeatLast', element, attrs);
			}, 1);
		};
})
	.controller('ProjectsController', function($scope, $http){
		$scope.projects = [];
		$scope.$on('onRepeatLast', function(scope, element, attrs){

			//jQuery("#grid-container").cubeportfolio('destroy');
			//jQuery("#grid-container").cubeportfolio({
			//		defaultFilter: '*',
			//		animationType: 'rotateSides',
			//		gapHorizontal: 10,
			//		gapVertical: 10,
			//		gridAdjustment: 'responsive',
			//		caption: 'overlayBottom',
			//		displayType: 'fadeIn',
			//		displayTypeSpeed: 100,
			//		singlePageInlineDelegate: '.cbp-singlePageInline',
			//		singlePageInlinePosition: 'below',
			//		singlePageInlineShowCounter: true,
			//		singlePageInlineInFocus: true,
			//		singlePageInlineCallback: function (url, element) {
            //
			//			// to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
			//			var t = this;
            //
			//			$.ajax({
			//					url: url,
			//					type: 'GET',
			//					dataType: 'html',
			//					timeout: 5000
			//				})
			//				.done(function (result) {
            //
			//					t.updateSinglePageInline(result);
            //
			//				})
			//				.fail(function () {
			//					t.updateSinglePageInline("Error! Please refresh the page!");
			//				});
			//		}
			//}
			//);
			console.log("projects loaded");
			var swiper = new Swiper('.swiper-container', {
				pagination: '.swiper-pagination',
				//setWrapperSize: true,
				slidesPerView: 'auto',
				centeredSlides: true,
				paginationClickable: true,
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
		console.log($scope.projects);
	});
});

