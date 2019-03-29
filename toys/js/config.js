
/*
  Settings
 */

(function() {
  this.$doc = $(document);

  this.$w = $(window);

  this.$html = $('html');

  this.$body = $('body');

  this.$wrapper = $('#wrapper');

  this.$container = $('#container');

  this.$changeImg = $('img.change_img');

  this.my = {
    bp_tab: 1100,
    bp_sp: 767,
    pc: '',
    tab: '',
    sp: '',
    pcView: '',
    tabView: '',
    spView: '',
    finish: '',
    vw: '',
    vh: '',
    sT: '',
    scrollMemory: 0,
    _ua: window.navigator.userAgent.toLowerCase(),
    ua: {}
  };

  my.ua.mobile = (my._ua.indexOf("windows") !== -1 && my._ua.indexOf("phone") !== -1) || my._ua.indexOf("iphone") !== -1 || my._ua.indexOf("ipod") !== -1 || (my._ua.indexOf("android") !== -1 && my._ua.indexOf("mobile") !== -1) || (my._ua.indexOf("firefox") !== -1 && my._ua.indexOf("mobile") !== -1) || my._ua.indexOf("blackberry") !== -1 ? true : false;

  my.ua.tablet = (my._ua.indexOf("windows") !== -1 && my._ua.indexOf("touch") !== -1) && (my._ua.indexOf('trident/7') === -1) || my._ua.indexOf("ipad") !== -1 || (my._ua.indexOf("android") !== -1 && my._ua.indexOf("mobile") === -1) || (my._ua.indexOf("firefox") !== -1 && my._ua.indexOf("tablet") !== -1) || my._ua.indexOf("kindle") !== -1 || my._ua.indexOf("silk") !== -1 || my._ua.indexOf("playbook") !== -1 ? true : false;

  my.ua.mouse = !my.ua.mobile && !my.ua.tablet ? true : false;

  my.ua.iphone = my.ua.mobile && (my._ua.indexOf("iphone") !== -1) ? true : false;

  my.ua.ipod = my.ua.tablet && (my._ua.indexOf("ipod") !== -1) ? true : false;

  my.ua.android = my.ua.mobile && (my._ua.indexOf("android") !== -1 && my._ua.indexOf("mobile") !== -1) ? true : false;

  my.ua.ipad = my.ua.tablet && (my._ua.indexOf("ipad") !== -1) ? true : false;

  my.ua.chrome = my.ua.mouse && (my._ua.indexOf('chrome') !== -1) && (my._ua.indexOf('edge') === -1) ? true : false;

  my.ua.firefox = my.ua.mouse && (my._ua.indexOf('firefox') !== -1) ? true : false;

  my.ua.safari = my.ua.mouse && (my._ua.indexOf('safari') !== -1) && (my._ua.indexOf('chrome') === -1) ? true : false;

  my.ua.edge = my.ua.mouse && (my._ua.indexOf('edge') !== -1) ? true : false;

  my.ua.ie = my.ua.mouse && (my._ua.indexOf('trident/7') !== -1) || (my._ua.indexOf('msie') !== -1) && (my._ua.indexOf('opera') === -1) ? true : false;

  my.ua.mac = my.ua.mouse && (my._ua.indexOf('mac') !== -1) && (my._ua.indexOf('os') !== -1) ? true : false;

  Object.keys(my.ua).forEach(function(key) {
    if (my.ua[key]) {
      return $html.addClass(key);
    }
  });


  /* Functions & Plugins */

  this.fnc = {
    checkValue: function() {
      my.vw = window.innerWidth;
      my.vh = $w.height();
      my.pc = my.vw > my.bp_tab ? true : false;
      my.tab = my.vw <= my.bp_tab && my.vw > my.bp_sp ? true : false;
      my.sp = my.vw <= my.bp_sp ? true : false;
    },
    fooLoad: function($o) {
      $o.each(function() {
        return $(this).attr('src', $(this).data('img'));
      });
    },
    loadImg: function() {
      my.finish = my.pcView && my.tabView && my.spView ? true : false;
      if (!my.finish) {
        if (my.pc || my.tab) {
          if (!my.pcView || !my.tabView) {
            fnc.fooLoad($('img.load_pc-tab'));
          }
          if (my.pc && !my.pcView) {
            fnc.fooLoad($('img.load_pc'));
            my.pcView = true;
          }
          if (my.tab && !my.tabView) {
            fnc.fooLoad($('img.load_tab-sp'));
            my.tabView = true;
          }
        } else if (!my.spView) {
          fnc.fooLoad($('img.load_sp,img.load_tab-sp'));
          my.spView = true;
        }
      } else if (!my.pcView) {
        my.pcView = true;
      }
    },
    changeImg: function() {
      var i, l, ref;
      if ($changeImg.length !== 0) {
        for (i = l = 0, ref = $changeImg.length; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
          if ($changeImg.eq(i).is('.custom')) {
            if (my.vw > $changeImg.eq(i).data('custom')) {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img'));
            } else {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img').replace('-before', '-after'));
            }
          } else if (!$changeImg.eq(i).is('.tab,.all')) {
            if (!my.sp) {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img'));
            } else {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img').replace('-pc', '-sp'));
            }
          } else if ($changeImg.eq(i).is('.tab')) {
            if (my.pc) {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img'));
            } else {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img').replace('-pc', '-tab'));
            }
          } else if ($changeImg.eq(i).is('.all')) {
            if (my.pc) {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img'));
            } else if (my.tab) {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img').replace('-pc', '-tab'));
            } else if (my.sp) {
              $changeImg.eq(i).attr('src', $changeImg.eq(i).data('img').replace('-pc', '-sp'));
            }
          }
        }
      }
    },
    checkDirection: function() {
      if (my.vh > my.vw) {
        $html.attr('data-direction', 'portrait');
      } else {
        $html.attr('data-direction', 'landscape');
      }
    },
    openModal: function(file, size) {
      return $.get(file, function(data) {
        $wrapper.append('<div id="obj_modal"><div class="inner">' + data + '</div></div>');
        setTimeout(function() {
          my.scrollMemory = my.sT;
          return $body.addClass('fix').css('top', -my.sT);
        }, 10);
        if (size) {
          return $('#inner_modal').css('max-width', size);
        }
      });
    },
    closeModal: function(speed) {
      $body.removeClass('fix').css('top', '');
      $w.scrollTop(my.scrollMemory);
      return setTimeout(function() {
        return $('#obj_modal').remove();
      }, speed ? speed : 800);
    },
    settingRwd: function() {
      fnc.checkValue();
      fnc.changeImg();
      fnc.loadImg();
      fnc.checkDirection();
    }
  };

  fnc.settingRwd();

  (function($) {
    var scrollOption;
    scrollOption = {};
    $.scrollDefault = function(options) {
      return $.extend(scrollOption, options);
    };
    return $.fn.extend({
      extendedResize: function(options) {
        var defaults, setting, timer, w;
        defaults = {
          loadAction: true,
          resizeAfter: function() {}
        };
        setting = $.extend(defaults, options);
        if (setting.loadAction) {
          this.load(function() {
            return setting.resizeAfter();
          });
        }
        timer = false;
        w = my.vw;
        this.resize(function() {
          if (timer !== false) {
            clearTimeout(timer);
          }
          return timer = setTimeout(function() {
            if (w !== my.vw) {
              setting.resizeAfter();
              return w = my.vw;
            }
          }, 300);
        });
        return this;
      },
      firstLoad: function(options) {
        var defaults, first, setting;
        defaults = {
          pc: function() {},
          pc_tab: function() {},
          tab: function() {},
          tab_sp: function() {},
          sp: function() {},
          min_w: '',
          max_w: '',
          min_max_w: ''
        };
        setting = $.extend(defaults, options);
        first = [];
        this.extendedResize({
          resizeAfter: function() {
            return setTimeout(function() {
              var i, l, n, o, ref, ref1, ref2, results;
              if (first[0] !== true && my.pcView) {
                setting.pc();
                first[0] = true;
              }
              if (first[1] !== true && my.pcView || first[1] !== true && my.tabView) {
                setting.pc_tab();
                first[1] = true;
              }
              if (first[2] !== true && my.tabView) {
                setting.tab();
                first[2] = true;
              }
              if (first[3] !== true && my.tabView || first[3] !== true && my.spView) {
                setting.tab_sp();
                first[3] = true;
              }
              if (first[4] !== true && my.spView) {
                setting.sp();
                first[4] = true;
              }
              if (setting.max_w) {
                for (i = l = 0, ref = setting.max_w.length; 0 <= ref ? l < ref : l > ref; i = 0 <= ref ? ++l : --l) {
                  if (first[100 + i] !== true && my.vw <= setting.max_w[i].vw) {
                    setting.max_w[i].process();
                    first[100 + i] = true;
                  }
                }
              }
              if (setting.min_w) {
                for (i = n = 0, ref1 = setting.min_w.length; 0 <= ref1 ? n < ref1 : n > ref1; i = 0 <= ref1 ? ++n : --n) {
                  if (first[200 + setting.min_w.length + i] !== true && my.vw >= setting.min_w[i].vw) {
                    setting.min_w[i].process();
                    first[200 + setting.min_w.length + i] = true;
                  }
                }
              }
              if (setting.min_max_w) {
                results = [];
                for (i = o = 0, ref2 = setting.min_max_w.length; 0 <= ref2 ? o < ref2 : o > ref2; i = 0 <= ref2 ? ++o : --o) {
                  if (first[300 + setting.min_max_w.length + i] !== true && my.vw >= setting.min_max_w[i].vw[0] && my.vw <= setting.min_max_w[i].vw[1]) {
                    setting.min_max_w[i].process();
                    results.push(first[300 + setting.min_max_w.length + i] = true);
                  } else {
                    results.push(void 0);
                  }
                }
                return results;
              }
            }, 200);
          }
        });
        return this;
      },
      hasAttr: function(name) {
        var attr;
        attr = this.attr(name);
        if (attr != null) {
          return true;
        } else {
          return false;
        }
      },
      activeAtShow: function() {
        this.show(0, function() {
          return $(this).addClass('active');
        });
        return this;
      },
      passiveAtHide: function(delay) {
        var $hide;
        $hide = this;
        $hide.removeClass('active');
        setTimeout(function() {
          return $hide.hide();
        }, delay);
        return this;
      },
      alignHeight: function(p, t, s) {
        var _this, foo_length;
        _this = this;
        foo_length = _this.length;
        return $w.extendedResize({
          resizeAfter: function() {
            var height, i, j, k, l, m, maxHeight, n, o, ref, ref1, ref2, results;
            _this.css('height', 'auto');
            m = my.pc ? p : my.tab ? t : s;
            if (m) {
              maxHeight = 0;
              if (m === 'all') {
                for (i = l = 0, ref = foo_length; 0 <= ref ? l <= ref : l >= ref; i = 0 <= ref ? ++l : --l) {
                  height = _this.eq(i).height();
                  if (height > maxHeight) {
                    maxHeight = height;
                  }
                }
                return _this.height(maxHeight);
              } else {
                results = [];
                for (i = n = 0, ref1 = Math.ceil(foo_length / m); 0 <= ref1 ? n < ref1 : n > ref1; i = 0 <= ref1 ? ++n : --n) {
                  maxHeight = 0;
                  for (j = o = 0, ref2 = m; 0 <= ref2 ? o < ref2 : o > ref2; j = 0 <= ref2 ? ++o : --o) {
                    height = _this.eq(i * m + j).height();
                    if (height > maxHeight) {
                      maxHeight = height;
                    }
                  }
                  results.push((function() {
                    var q, ref3, results1;
                    results1 = [];
                    for (k = q = 0, ref3 = m; 0 <= ref3 ? q < ref3 : q > ref3; k = 0 <= ref3 ? ++q : --q) {
                      results1.push(_this.eq(i * m + k).height(maxHeight));
                    }
                    return results1;
                  })());
                }
                return results;
              }
            }
          }
        });
      },
      otherClick: function(fnc) {
        var _this;
        _this = this;
        return $doc.on('click', function(e) {
          if (!$.contains($(_this)[0], e.target)) {
            return fnc(e);
          }
        });
      },
      smoothScroll: function(options) {
        var settings;
        settings = $.extend({}, scrollOption, options);
        return $html.add($body).not(':animated').animate({
          scrollTop: String(this.offset().top + (my.pc ? settings.pcPosition : my.tab ? settings.tabPosition : settings.spPosition))
        }, settings.speed, settings.easing);
      },
      wrapAllStr: function() {
        var TEXT_NODE;
        TEXT_NODE = 3;
        $(this).children().addBack().contents().each(function() {
          if (this.nodeType === TEXT_NODE) {
            return $(this).replaceWith($(this).text().replace(/(\S)/g, '<i>$&</i>'));
          }
        });
        return this;
      }
    });
  })(jQuery);


  /*
    readyEvent
   */

  $(function() {
    var $target;
    $doc.on('click', '#obj_closeModal', fnc.closeModal);
    $doc.on('click', '#obj_modal', function(e) {
      if ($(e.target).is('#obj_modal')) {
        return fnc.closeModal();
      }
    });
    if (my.ua.mobile || my.ua.tablet) {
      $doc.on('touchstart', '*', function() {
        return $(this).addClass('touchstart').removeClass('touchend');
      });
      $doc.on('touchend', '*', function() {
        return $(this).addClass('touchend').removeClass('touchstart');
      });
    }
    $('img.change_txt').each(function() {
      var br, device, i, l, ref, txt;
      txt = $(this).attr('alt');
      device = $(this).hasAttr('data-device') ? $(this).attr('data-device') : 'tab-sp';
      if ($(this).hasAttr('data-br')) {
        br = $(this).attr('data-br').split(',');
        for (i = l = 0, ref = br.length; 0 <= ref ? l <= ref : l >= ref; i = 0 <= ref ? ++l : --l) {
          txt = txt.slice(0, Number(br[i]) + 4 * i) + '<br>' + txt.slice(Number(br[i]) + 4 * i, txt.length);
        }
      }
      return $(this).after("<span class=\"view_" + device + "\">" + txt + "</span>");
    });
    $('a').not('.noscroll').on('click', function(e) {
      var $target, case1, case2, href;
      href = $(this).attr('href');
      case1 = href.charAt(0) === '#';
      case2 = location.href.split('#')[0] === href.split('#')[0];
      if (case1 || case2) {
        if (case2) {
          href = '#' + href.split('#')[1];
        }
        $target = $(href);
        if ($target.length) {
          $target.smoothScroll();
        }
        return e.preventDefault();
      }
    });
    $target = $('#' + window.location.href.split('#')[1]);
    if ($target.length) {
      $w.on('load', function() {
        return $target.smoothScroll({
          speed: 10
        });
      });
    }
    return $w.on({
      load: function() {
        return $w.trigger('resize').trigger('scroll');
      },
      resize: function() {
        return fnc.checkValue();
      },
      scroll: function() {
        return my.sT = $w.scrollTop();
      }
    }).extendedResize({
      loadAction: false,
      resizeAfter: function() {
        return fnc.settingRwd();
      }
    });
  });

}).call(this);
