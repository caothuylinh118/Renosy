// viewport
$(function () {
  var ua = navigator.userAgent;
  if ((ua.indexOf('iPhone') > 0) || ua.indexOf('iPod') > 0 || (ua.indexOf('Android') > 0 && ua.indexOf('Mobile') > 0)) {
    $('head').prepend('<meta name="viewport" content="width=device-width, initial-scale=1">');
  }
  else {
    $('head').prepend('<meta name="viewport" content="width=1200">');
  }                 // <meta name="viewport" content="width=1000">
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
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });

  // 事例
  // ---------------------------------------
  //スライド
  var $case_slides = $("#case").find(".slides");
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
  //after切り替え
  $('.nav .item').click(function(){
    var itemNum = $(this).index('.slide.is-selected .nav .item');

    $(this).closest('.slide').find('.image .is-selected').removeClass('is-selected');
    $(this).closest('.slide').find('.image li').eq(itemNum).addClass('is-selected');

    $(this).siblings('.is-selected').removeClass('is-selected');
    $(this).addClass('is-selected');
  });
});
