(function() {
  $('document').ready(function() {
    var $form, $input, $required, $submitBtn, isValidAll, validation;
    $form = $('[data-js-elm=form]');
    $input = $form.find(':input');
    //$required = $form.find('.required').children('td');
    $submitBtn = $('[data-js-elm=submit]');
    isValidAll = false;

    $('[name=zip]').on('keyup', function() {
      var query, url, zip;
      if ($(this).parent().attr('data-valid') === "true") {
        zip = $(this).val();
        url = 'https://api.zipaddress.net?callback=?';
        query = {
          'zipcode': zip
        };
         $.getJSON(url, query).done(function(json) {
          if (json.code == null) {
            $('[name=pref]').val(json.pref);
            $('[name=address]').val(json.address);
             validation($('[name=pref],[name=address]'), true);
          }
        });
      }
    });

    validation = function($el, operation) {
      $el.each(function() {
        var isInputted, isValid, val;
        val = $el.val();
        isInputted = val.match(/\S/) ? true : false;
        isValid = "";
        switch ($el.attr('name')) {
          case 'contactName':
            isValid = isInputted;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'contactPhoneticName':
            isValid = val.match(/^[ぁ-ん ー]+$/) ? true : false;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'zip':
            isValid = val.match(/^\d{7}$/) ? true : false;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'pref':
            isValid = isInputted;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'address':
            isValid = isInputted;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'email':
            isValid = val.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i) ? true : false;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'mobilePhone':
            isValid = val.match(/^\d{11}$/) ? true : false;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'fixedPhone':
            isValid = val.match(/^\d{10}$|^\d{11}$/) ? true : false;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'requestDay1':
            var time = $('#requestTime1').val();
            if (!time){
                isInputted = false;
            }
            isValid = isInputted;
            $(this).parent().parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'requestTime1':
            var date = $('#requestDay1').val();
            if (!date){
                isInputted = false;
            }
            isValid = isInputted;
            $(this).parent().parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
          case 'requestDay2':
            var time = $('#requestTime2').val();
            if (!time){
                isInputted = false;
            }
            isValid = isInputted;
            $(this).parent().parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'requestTime2':
            var date = $('#requestDay2').val();
            if (!date){
                isInputted = false;
            }
            isValid = isInputted;
            $(this).parent().parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
          case 'requestDay3':
            var time = $('#requestTime3').val();
            if (!time){
                isInputted = false;
            }
            isValid = isInputted;
            $(this).parent().parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'requestTime3':
            var date = $('#requestDay3').val();
            if (!date){
                isInputted = false;
            }
            isValid = isInputted;
            $(this).parent().parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
          }
      });
      $required = $el.parents('[data-js-elm=form]').find('.required').children('.body');
      isValidAll = $required.filter('[data-valid="true"]').length === $required.length ? true : false;
      $submitBtn.attr('data-disabled', !isValidAll);
    };

    $input.on('input blur change', function() {
      validation($(this), true);
    });

    $('form').on('submit', function(e) {
      var send_value = document.getElementById("form_description").value;
      send_value = send_value + '\n【第一希望】' + document.getElementById("requestDay1").value + "　" + document.getElementById("requestTime1").value;
      send_value = send_value + '\n【第二希望】' + document.getElementById("requestDay2").value + "　" + document.getElementById("requestTime2").value;
      send_value = send_value + '\n【第三希望】' + document.getElementById("requestDay3").value + "　" + document.getElementById("requestTime3").value;
      document.getElementById("form_description").value = send_value;
      var action, formData;
      e.preventDefault();
      formData = $(this).serialize();
      action = $(this).attr('action');
      $body.addClass('sendding').css('top', -my.sT);
      $.ajax({
        type: 'POST',
        url: action,
        data: formData
      }).done(function(res) {
        var params;
        if (res.status === 400) {
          location.href = "./error.html";
        } else {
          params = {
            pageId: 'inquiry-renov_seminar',
            id: res.id
          };
          location.href = "./thanks.html?" + $.param(params);
        }
      }).fail(function() {
        location.href = "./error.html";
      });
    });
    // $doc.on('input', 'textarea', function(e) {
    //   var oh, sh;
    //   $(this).height('auto');
    //   sh = this.scrollHeight;
    //   oh = this.offsetHeight;
    //    $(this).height(sh > oh ? sh : oh);
    // });
    if (my.ua.mouse) {
      $input.on('keydown', function(e) {
        var index, isEnter, isTab;
        isEnter = e.keyCode === 13;
        isTab = e.keyCode === 9;
        if (isEnter || isTab) {
          index = $input.index(this);
          if (index === $input.length - 1) {
            if (e.shiftKey || e.ctrlKey || e.metaKey || isTab) {
              if (isValidAll) {
                $submitBtn.focus();
              } else {
                $input.first().focus();
              }
               false;
            }
          } else {
            $input.eq(index + 1).focus();
             false;
          }
        }
      });
    }
    $submitBtn.on('keydown', function(e) {
      var isEnter, isTab;
      isEnter = e.keyCode === 13;
      isTab = e.keyCode === 9;
      if (isEnter && isValidAll) {
        $form.submit();
      } else if (isTab) {
        $form.find('input').first().focus();
      }
      false;
    });
    $submitBtn.on('click', function(e) {
      if (isValidAll) {
        $(this).parents('form').submit();
      }
    });
  });

  $('ul.radio-wrap li input[type="radio"]').on("change click blur",function(){
    if($(this).attr('value') == 'tel-type01'){
       $('input.ttt').attr({
        'name': 'mobilePhone',
        'placeholder': '09012345678'
      });
      $(this).parents(".tel").removeClass("fixed");
      $(this).parents(".tel").addClass("mobile");
    } else {
      $('input.ttt').attr({
        'name': 'fixedPhone',
        'placeholder': '0124567890'
      });
      $(this).parents(".tel").removeClass("mobile");
      $(this).parents(".tel").addClass("fixed");
    }
  });

  $('input').on("change click blur",function(){
    $(this).parents('form').addClass('current');
  });

  $('input[name="zip"]').on("change click blur",function(){
    if ($(this).val() == "") {
      $(this).parents('.item').removeClass('required');
      $(this).parents('.item').addClass('free');
    } else {
      $(this).parents('.item').addClass('required');
      $(this).parents('.item').removeClass('free');
    }
  });

  function selectColor() {
    // 現在選択されてる項目によって色設定
    if($('select').find('option:selected').hasClass('default')) {
      $('select').css({'color': '#ccc'});
    }

  　 // 項目が変更された時、条件によって色変更
    $('select').on('change', function(){
      if($(this).find('option:selected').hasClass('default')) {
        $(this).css({'color': '#ccc'});
      } else {
        $(this).css({'color': '#000'});
      }
    });
  }

  selectColor();

}).call(this);
