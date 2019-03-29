$(function slideNavbar(){
    var nav = $('#Navigation');
    var w = $('#Navigation').width();
    var div = $('<div />').addClass("__glayLayerNavbar __closeNavbar");

    function showNavbar(){
      console.log("aa");
      nav.animate({"right":"0px"}, 500, "easeOutSine");
      $('body').append(div);
    }

    function closeNavbar(){
      nav.animate({"right":"-" + w + "px"}, 500, "easeOutSine");
      $('body').find('.__glayLayerNavbar').remove();
    }

    $(document).on('click','#__showNavbar',function(){
      showNavbar();
    });

    $(document).on('click','.__closeNavbar',function(){
      closeNavbar();
    });
    $(document).on('click','.navbar_nav_list a',function(){
      closeNavbar();
    });
});
