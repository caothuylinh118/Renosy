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
  //after切り替え
  $('.nav .item').click(function(){
    var itemNum = $(this).index('.slide.is-selected .nav .item');

    $(this).closest('.slide').find('.image .is-selected').removeClass('is-selected');
    $(this).closest('.slide').find('.image li').eq(itemNum).addClass('is-selected');

    $(this).siblings('.is-selected').removeClass('is-selected');
    $(this).addClass('is-selected');
  });

  // 注意書きを開く
  // ---------------------------------------
  $('.form-attention h5, #fair .form-attention h5').click(function(){
    $(this).toggleClass('open');
    $(this).next('.form-attention-text').slideToggle(300, 'swing');
  });

  // フォームを開く
  // ---------------------------------------
  $('#fair .event-summary .e_btn').click(function(){
    $(this).toggleClass('open');
    $(this).closest('.fair-wrap').find('.event-form').slideToggle(300, 'swing');
  });

  // 個別相談会フォームを開く
  // ---------------------------------------
  $('#fair .event-notes a').click(function(){
    $('#private-consultation .event-summary .e_btn').addClass('open');
    $('#private-consultation .event-form').slideDown(300, 'swing');
  });
});
