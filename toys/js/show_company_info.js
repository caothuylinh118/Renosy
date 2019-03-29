var CompanyInfo = (function(window, undefined) {

  //コンストラクタ
  var CompanyInfo = function(callbackName, jsonURL) {
    this.jsonURL = jsonURL;
    this.callbackName = callbackName;
    this.addEvent();
  }

  var prot = CompanyInfo.prototype;

  prot.addEvent = function() {
    var self = this;
    document.addEventListener("DOMContentLoaded", function(event) {
      self.setCallback(self.getElements());
      self.execute(self.jsonURL);
    });
  }

  //書き換えるdata-company-infoがついたDOMを収集
  prot.getElements = function() {
    return document.querySelectorAll("[data-company-info]");
  }

  //company_info_callbackに実行するfunctionを登録
  prot.setCallback = function(nodes) {
    var self = this;
    var list = nodes;
    var node = Array.prototype.slice.call(list, 0);
    window[this.callbackName] = function(data) {
      node.forEach(function(element) {
        var execFuncName = element.getAttribute('data-company-info');
        if (self[execFuncName] !== undefined) {
          var dataCopy = JSON.parse(JSON.stringify(data)); //dataを値渡し
          self[execFuncName](dataCopy, element);
        }
      })
    }
  }

  //urlとnameからアンカーリンクを生成
  prot.linkHelper = function(object) {
    if (object.url) {
      object['name'] = '<a href=' + object.url + ' target="_blank">' + object.name + '</a>';
      delete object.url;
    }
    return object;
  }

  //telとfaxから電話・ファックスの文字列を作成
  prot.telHelper = function(object) {
    if (object.tel && object.fax) {
      object['tel'] = 'Tel.' + object.tel + '　Fax.' + object.fax;
      delete object.fax;
    }
    return object;
  }

  //mapUrlとaddressからgoogle mapリンクを作成
  prot.mapLinkHelper = function(object) {
    if (object.address && object.mapUrl) {
      object['address'] = '<a href=' + object.mapUrl + ' target="_blank">' + object.address + '</a>';
      delete object.mapUrl;
    }
    return object;
  }

  //callbackの実行
  prot.execute = function(jsonpURL) {
    var s = document.createElement("script");
    s.src = jsonpURL;
    document.body.appendChild(s);
  }

  /**
   * 各ページ・パーツのcallbackの実装
   *
   * コンテンツ内とフッターなど1ページ内で複数書き換えが必要な場合を考慮して
   * 複数関数がcompany_info_callback内で呼ばれるようにしています。
   *
   * 動的にコールバックが設定されるイメージ
   * function company_info_callback(){
   *  companyMain();
   *  footerAddress();
   *  lp();
   * }
   *
   * タグにdata-company-info='関数名'とつけるとcompany_info_callbackに関数が登録され
   * 下記に作成した関数が実行されレンダリングされます。
   */

  //renosy 会社概要メイン(/company)
  //[data-company-info=companyMain]としているため下記の関数が呼ばれる
  prot.companyMain = function(data, element) {
    var self = this;
    var result = '';

    //役員名のpostとnameを結合
    var officerNameHelper = function(object) {
      if (object.post) {
        var post = (object.post) ? object.post + '　' : '';
        object['name'] = post + object.name;
        delete object.post;
      }
      return object;
    }

    //addressのオフィスラベルをdivでラップ
    var addressHelper = function(object, key) {
      if (key === 'address') {
        object.name = '<div class="js-ofiice-label">' + object.name + '</div>';
        object.postalCode = '〒' + object.postalCode;
      }
      return object;
    }

    //事業内容の文言先頭にハイフンつける
    var servicesHelper = function(object, key) {
      if (key === 'services') {
        object.name = '- ' + object.name;
      }
      return object;
    }

    //ヘルパーを実行、表示しないパラメータを削除
    var formatData = function(object) {
      object = self.linkHelper(object);
      object = self.mapLinkHelper(object);
      object = self.telHelper(object);
      object = officerNameHelper(object);
      object = addressHelper(object, key);
      object = servicesHelper(object, key);
      delete object.type;
      delete object.otherLink;
      return object;
    }

    //オブジェクトの属性を繋いで文字列生成
    var objectToString = function(object) {
      if (typeof object === 'string') return object;
      var htmlText = '';
      object = formatData(object);
      for (var value in object) {
        htmlText += object[value];
      }
      return htmlText;
    }

    //jsonpからhtml作成
    var render = function(nodeData, key) {
      var htmlText = '';

      //タイトル
      if (nodeData.label) htmlText += "<dt>" + nodeData.label + "</dt>";

      //子要素のないvalue属性
      if (nodeData.value && (typeof nodeData.value === 'string' || typeof nodeData.value.name === 'string')) {
        htmlText += "<dd>" + objectToString(nodeData.value) + "</dd>";
        return htmlText;
      }

      //子要素のあるvalue属性
      if (nodeData.value && typeof nodeData.value === 'object') {
        var isArray = Array.isArray(nodeData.value);
        htmlText += (isArray) ? '<dd>' : '<dd><dl>';
        for (value in nodeData.value) {
          htmlText += render(nodeData.value[value], key); //再帰呼び出し
        }
        htmlText += (isArray) ? '</dd>' : '</dl></dd>';
        return htmlText;
      }

      //value属性ではないobject
      nodeData = formatData(nodeData);
      htmlText += (key === 'address') ? '<div>' : '';
      for (var value in nodeData) {
        htmlText += nodeData[value] + '<br>';
      }
      htmlText += (key === 'address') ? '</div>' : '';
      return htmlText;
    };

    //メインループ開始
    result += '<dl>';
    for (var value in data) {
      var key = value;
      result += render(data[value], value);
      if (key === 'address') result += '</dl><dl>'; //所在地の部分でdlを閉じて２段組にする
    }
    result += '</dl>';

    element.innerHTML = result;
  }

  //lpの例 divに[data-company-info=lp]としているため下記の関数が呼ばれる
  prot.lp = function(data, element) {
    var self = this;
    var result = '';

    //役員名のpostとnameを結合
    var officerNameHelper = function(object) {
      if (object.post) {
        var post = (object.post) ? object.post : '';
        object['name'] = '<span class="office-post">' + post + '</span>' + object.name;
        delete object.post;
      }
      return object;
    }

    //addressのオフィスラベルをdivでラップ
    var addressHelper = function(object, key) {
      if (key === 'address') {
        object.name = '<div class="js-ofiice-label">' + object.name + '</div>';
        object.postalCode = '〒' + object.postalCode;
      }
      return object;
    }

    //事業内容の文言先頭にハイフンつける
    var servicesHelper = function(object, key) {
      if (key === 'services') {
        object.name = '- ' + object.name;
      }
      return object;
    }

    //ヘルパーを実行、表示しないパラメータを削除
    var formatData = function(object) {
      object = self.linkHelper(object);
      object = self.mapLinkHelper(object);
      object = self.telHelper(object);
      object = officerNameHelper(object);
      object = addressHelper(object, key);
      object = servicesHelper(object, key);
      delete object.type;
      delete object.otherLink;
      return object;
    }

    //オブジェクトの属性を繋いで文字列生成
    var objectToString = function(object) {
      if (typeof object === 'string') return object;
      var htmlText = '';
      object = formatData(object);
      for (var value in object) {
        htmlText += object[value];
      }
      return htmlText;
    }

    //jsonpからhtml作成
    var render = function(nodeData, key) {
      var htmlText = '';

      //タイトル
      if (nodeData.label) htmlText += "<dt>" + nodeData.label + "</dt>";

      //子要素のないvalue属性
      if (nodeData.value && (typeof nodeData.value === 'string' || typeof nodeData.value.name === 'string')) {
        htmlText += "<dd>" + objectToString(nodeData.value) + "</dd>";
        return htmlText;
      }

      //子要素のあるvalue属性
      if (nodeData.value && typeof nodeData.value === 'object') {
        var isArray = Array.isArray(nodeData.value);
        htmlText += (isArray) ? '<dd>' : '<dd><dl>';
        for (value in nodeData.value) {
          htmlText += render(nodeData.value[value], key); //再帰呼び出し
        }
        htmlText += (isArray) ? '</dd>' : '</dl></dd>';
        return htmlText;
      }

      //value属性ではないobject
      nodeData = formatData(nodeData);
      htmlText += (key === 'address') ? '<div class="address">' : '';
      for (var value in nodeData) {
        htmlText += nodeData[value] + '<br>';
      }
      htmlText += (key === 'address') ? '</div>' : '';
      return htmlText;
    };

    //メインループ開始
    result += '<dl>';
    for (var value in data) {
      var key = value;
      result += render(data[value], value);
      if (key === 'address') result += '</dl><dl>'; //所在地の部分でdlを閉じて２段組にする
    }
    result += '</dl>';

    element.innerHTML = result;
  }
  

  //[data-company-info=test]としているため下記の関数が呼ばれる
  prot.test = function(data, element) {
    var table = "";
    table += '<hr>'
    table += '<p>テストです</p>';
    table += '<table class="companyTable">';
    table += "<tr>";
    table += "<th>" + data.companyName.label + "</th>";
    table += "<td>" + data.companyName.value + "</td>";
    table += "</tr></table>";
    element.innerHTML = table;
  }

  return CompanyInfo;

})(window);


new CompanyInfo('company_info_callback', //jsonpのコールバック名
  'https://www.ga-tech.co.jp/corporate_info.js' //jsonpアドレス
);
