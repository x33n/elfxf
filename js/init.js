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





    smoothScroll.init({
        offset: 20
    });
    gumshoe.init({
        offset: 21
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
