(function() {
  $('document').ready(function() {
    var $form, $input, $required, $submitBtn, isValidAll, validation;
    $form = $('[data-js-elm=form]');
    $input = $form.find(':input:visible');
    $required = $form.find('.required').children('td');
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
          case 'contactEmail':
            isValid = val.match(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i) ? true : false;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'contactHomePhoneNumber':
            isValid = val.match(/^\d{10}$|^\d{11}$/) ? true : false;
            $(this).parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
            break;
          case 'content':
            isValid = isInputted;
            $(this).parent().parent().attr('data-inputted', isInputted);
            return $(this).parent().attr('data-valid', isValid);
          }
      });
      $required = $el.parents('[data-js-elm=form]').find('.required').children('.item_body');
      isValidAll = $required.filter('[data-valid="true"]').length === $required.length ? true : false;
      $submitBtn.attr('data-disabled', !isValidAll);
    };

    $input.on('input blur change', function() {
      validation($(this), true);
    });

    if ($("#hasValidation").val() === "1") {
      validation($input, true);
      $('[data-js-elm=submit]').attr('data-disabled', "false");
      $input.on('input blur change', function() {
        validation($(this), true);
      });
    }


    // $doc.on('input', 'textarea', function(e) {
    //   var oh, sh;
    //   $(this).height('auto');
    //   sh = this.scrollHeight;
    //   oh = this.offsetHeight;
    //    $(this).height(sh > oh ? sh : oh);
    // });
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
