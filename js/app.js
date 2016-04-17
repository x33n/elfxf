angular.module('cloverApp', ['ngDialog']).
	directive('onLastRepeat', function() {
		return function(scope, element, attrs) {
			if (scope.$last) setTimeout(function(){
				scope.$emit('onRepeatLast', element, attrs);
			}, 1);
		};
})

	.config(function (ngDialogProvider) {
		ngDialogProvider.setForceHtmlReload(true);
	})

	.controller('ProjectsController', function($scope, $http, $q, ngDialog){
		$scope.projects = [];
		$scope.prj = [];
		$scope.$on('onRepeatLast', function(scope, element, attrs){
			console.log("projects  carousel html structure loaded");
			var swiper = new Swiper('.projects-carousel', {
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

				//autoplay: 5000,
				slideToClickedSlide: true,
				lazyLoading: false,
				lazyLoadingInPrevNextAmount: 5,
				lazyLoadingOnTransitionStart: true

			});


		});

		$http.get('../projects/projectsdb-new.json')
			.success(function(data){
				$scope.projects = data;

			});

		$scope.showProjectInfo = function(project){
			$scope.prj = $scope.projects[project];
			console.log("получено значение: " + $scope.prj['name']);
			ngDialog.open({
				template: '../templates/pages/projects/projectinfo.html'
			}).then(setTimeout(function(){
				var galleryTop = new Swiper('.gallery-top', {
					spaceBetween: 10,
					preloadImages: false
				});
				var galleryThumbs = new Swiper('.gallery-thumbs', {
					initialSlide: 0,
					spaceBetween: 10,
					centeredSlides: true,
					slidesPerView: 'auto',
					touchRatio: 0.2,
					preloadImages: false,
					slideToClickedSlide: true
				});
				galleryTop.params.control = galleryThumbs;
				galleryThumbs.params.control = galleryTop;
			}, 1000));


			};



	})
	.controller('CallbackFormController', function ($scope, $http, ngDialog) {
		// initializing form
		$scope.form = {
			client: "",
			phone: "",
			time: ""
		};
		$scope.orderCall = function () {
			ngDialog.open({
				template: '/templates/forms/callback.html',
				className: 'ngdialog-theme-flat',
				scope: $scope
			});
			var inputTime = $('#inputTime').clockpicker({
				placement: 'bottom',
				align: 'left',
				autoclose: true,
				'default': 'now'
			});
		};

			// submit form
		$scope.submitForm = function (form) {
			// passing value to variable
			var callForm = {
				client: form.client,
				phone: form.phone
			};
			if (callForm.client === "") {
				callForm.client = "Не указано";
			}
		};

	});





