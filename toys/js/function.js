// viewport
$(function () {
  var ua = navigator.userAgent;
});                 // <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">

//
$(function () {
  // ページ内スクロールリンク
  // ---------------------------------------
  $('a[href^=#]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href === "#" || href === "" ? 'html' : href);
    var position = target.offset().top - $('body').css("padding-top").split("px")[0];
    $('#Navigation').removeClass("openMain");
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });

  /* Menu sp open */
  var navIcon = $('.nav-icon');
  var Navigation = $('#Navigation');
  var navClose = $('.nav-iconClose');
  navIcon.on("click", function(e){
    e.preventDefault();
    Navigation.toggleClass("openMain");
  });
  navClose.on("click", function(e){
    e.preventDefault();
    Navigation.removeClass("openMain");
  });
});

//
$(function () {
  // ページ内スクロールリンク
  // ---------------------------------------
  $('a[href^=#]').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href === "#" || href === "" ? 'html' : href);
    var position = target.offset().top - $('body').css("padding-top").split("px")[0];
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });


  // 事例
  // ---------------------------------------
  //スライド
  var $case_slides = $(".case_sp").find(".slides");
  var allImage2 = $case_slides.find(".slide img");
  var allImageCount2 = allImage2.length;
  var completeImageCount2 = 0;

  for(var i = 0; i < allImageCount2; i++){
    var img = $('<img>');
    img.load(function() {
      completeImageCount2 ++;
      if (allImageCount2 === completeImageCount2){
        $.when(
          $case_slides.flickity()
        ).done(function(){
          $case_slides.find('slide').css({
            height: '100%'
          });
        });
      }
    });
    img.attr('src', allImage2.attr('src'));
  }
});
