(function() {
  $('document').ready(function() {
    $('.contactCompany .item_body').html(localStorage.getItem("contactCompany"));
    $('.contactName .item_body').html(localStorage.getItem("contactName"));
    $('.contactEmail .item_body').html(localStorage.getItem("contactEmail"));
    $('.contactPhoneNumber .item_body').html(localStorage.getItem("contactPhoneNumber"));
    $('.content .item_body').html(localStorage.getItem("content"));
    $('.free .item_body').html(localStorage.getItem("free"));
  });
}).call(this);
