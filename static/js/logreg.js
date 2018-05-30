$(function(){
  $("#login").on("click", function (e) {
    $(".fixed").css({ "display": "block" });
  });
  $("#close").on("click", function (e) {
    $(".fixed").css({ "display": "none" });
  });
});
