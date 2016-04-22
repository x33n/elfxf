angular.module('cloverApp', ['ngDialog', 'mgo-angular-wizard'])

    .directive('onLastRepeat', function () {
        return function (scope, element, attrs) {
            if (scope.$last) setTimeout(function () {
                scope.$emit('onRepeatLast', element, attrs);
            }, 1);
        };
    })

    .directive('onLastestRepeat', function () {
        return function (scope, element, attrs) {
            if (scope.$last) setTimeout(function () {
                scope.$emit('onRepeatLastest', element, attrs);
            }, 1);
        };
    })

    .controller('ProjectsController', function ($scope, $http, $q, ngDialog) {
        $scope.projects = [];
        $scope.prj = [];
        $scope.$on('onRepeatLast', function (scope, element, attrs) {
            console.log("projects  carousel html structure loaded");
            var projectsCarousel = new Swiper('.projects-carousel', {
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
            .success(function (data) {
                $scope.projects = data;

            });
        $scope.showProjectInfo = function (project) {
            $scope.prj = $scope.projects[project];
            console.log("получено значение: " + $scope.prj['name']);
            ngDialog.open({
                template: '../templates/pages/projects/projectinfo.html',
                scope: $scope
            });
            $scope.$on('onRepeatLastest', function (scope, element, attrs) {

                var galleryTop = new Swiper('.gallery-top', {
                    spaceBetween: 10,
                    preloadImages: true
                });
                var galleryThumbs = new Swiper('.gallery-thumbs', {
                    initialSlide: 0,
                    spaceBetween: 0,
                    centeredSlides: true,
                    slidesPerView: 'auto',
                    touchRatio: 0.3,
                    preloadImages: true,
                    slideToClickedSlide: true
                });
                galleryTop.params.control = galleryThumbs;
                galleryThumbs.params.control = galleryTop;
                console.log("Gallery Initiated");

                var wh = jQuery(window).height();
                var pw = jQuery('.ngdialog-content').height();
                console.log("window: " + wh);
                console.log("modal: " + pw);
                if(wh > pw){
                    jQuery('.ngdialog-content').css('margin-top', ((wh-pw)/4));
                }

                });



        };


    })
    .controller('CallbackFormController', function ($scope, $http, ngDialog) {

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

        };



        $scope.submitForm = function (form) {
            console.log("form submitted");

            // passing value to variable
            var callForm = {
                mail: "noreply@kleverudachi.ru",
                subject: "Посетитель сайта ждёт звонка!",
                message: "Имя: "+ form.client + "\n" + "Номер телефона: " + form.phone
            };
            if (callForm.client === "") callForm.client = "Не указано";
            console.log(callForm.message);
            $http({
                method: 'POST',
                url: "mail.php",
                data: {
                    'email': callForm.mail,
                    'subject': callForm.subject,
                    'message': callForm.message
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function (data, status, headers, config) {
                $scope.status = status;
                /* for debug mode*/
                console.log("Успешно. Статус отправки: " + status);
                $scope.data = data;
                console.log(data);
                ngDialog.close();
                $scope.form.client = "";
                $scope.form.phone = "";
                ngDialog.open({
                    template: '<p>Ваша заявка отправлена</p><button ng-click="closeThisDialog()" class="btn btn-send btn-block">ОК</button>',
                    className: 'ngdialog-theme-flat',
                    plain: true
                });
            }).error(function (data, status, headers, config) {
                $scope.status = status;
                /* for debug mode*/
                $scope.data = data || "Request failed";
            });
        };
    })
    .controller('CalculateFormController', function ($scope, $http, ngDialog) {
        // initializing form
        $scope.form = {
            client: "",
            phone: "",
            time: ""
        };
        $scope.projectCalc = function () {
            ngDialog.open({
                template: '/templates/forms/calculate.html',
                className: 'ngdialog-theme-default',
                showClose: false,
                scope: $scope
            });

        };



        //$scope.submitForm = function (form) {
        //    console.log("form submitted");
        //    // passing value to variable
        //    var callForm = {
        //        mail: "noreply@kleverudachi.ru",
        //        subject: "Посетитель сайта ждёт звонка!",
        //        message: "Имя: "+ form.client + "\n" + "Номер телефона: " + form.phone
        //    };
        //    if (callForm.client === "") callForm.client = "Не указано";
        //    console.log(callForm.message);
        //    $http({
        //        method: 'POST',
        //        url: "mail.php",
        //        data: {
        //            'email': callForm.mail,
        //            'subject': callForm.subject,
        //            'message': callForm.message
        //        },
        //        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        //    }).success(function (data, status, headers, config) {
        //        $scope.status = status;
        //        /* for debug mode*/
        //        console.log("Успешно. Статус отправки: " + status);
        //        $scope.data = data;
        //        console.log(data);
        //        ngDialog.close();
        //        $scope.form.client = "";
        //        $scope.form.phone = "";
        //        ngDialog.open({
        //            template: '<p>Ваша заявка отправлена</p><button ng-click="closeThisDialog()" class="btn btn-send btn-block">ОК</button>',
        //            className: 'ngdialog-theme-flat',
        //            plain: true
        //        });
        //    }).error(function (data, status, headers, config) {
        //        $scope.status = status;
        //        /* for debug mode*/
        //        $scope.data = data || "Request failed";
        //    });
        //};
    });

