$(function () {
  var p = $(".box .mid-field").eq(0);
  var c = p.find(":nth-of-type(2)").clone();
  console.log(c);
  $("#add").on("click", function (e) {
    p.append(c)
  });
});
