$(function(){
  $("#logreg").on("click", function (e) {
    $(".fixed").css({ "display": "block" }).find("input[type=text]").focus();
  });
  $("#close").on("click", function (e) {
    $(".fixed").css({ "display": "none" });
  });
});
