$(function() {
 var wh = $(window).height();
 var mcapth =  $("#main_capt").height();
 $("#bgMain").css('height', wh);
 var marg = (wh/2)-236;
 $("#main_capt").css('margin-top', marg);
 var $bgobj = $("#bgMain");
 $(window).on("scroll", function () {
     var yPos = -($(window).scrollTop() / $bgobj.data('speed'));
       var coords = 'center ' + yPos * (30) + 'px';
        $bgobj.css({ backgroundPosition: coords });
     });

 $('.projects').slick({
      dots: true,

  infinite: false,
  speed: 800,
  slidesToShow: 3,
  slidesToScroll: 1,

  //lazyLoad: 'ondemand',
    // mobileFirst: true,
    responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
    ]
  });

$(document).on('click', '#projectForm', function(){

    $('#projectFormModal').arcticmodal();
});
$(document).on('click', '#backCallForm', function(){
    $('#backCallFormModal').arcticmodal();
});
$(document).on('click', '#questionForm', function(){
    $('#questionFormModal').arcticmodal();
});
});
