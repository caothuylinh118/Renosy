(function() {
  /*---------------------------------------------*
   * nav
   ---------------------------------------------*/
  var menu = $("#Navigation_sp");
  menu.css("right", "-100%");
  $(".menuShow_sp").click(function(e) {
    menu.animate({
      right: '0'
    });
    $('body').addClass('noScroll');
    });

  $(".navbar_btn_close").click(function(e) {
    menu.animate({
      right: '-100%'
    });
    $('body').removeClass('noScroll');
  });
  $(".navbar_nav_list a").click(function(e) {
    menu.animate({
      right: '-100%'
    });
    $('body').removeClass('noScroll');
  });
})();
