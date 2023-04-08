document.addEventListener("DOMContentLoaded", function () {
  var productId;
  var deleteForm = document.forms["delete-product-form"];
  var btnDeleteproduct = document.getElementById("btn-delete-product");
  var restoreForm = document.forms["restore-product-form"];
  var restoreBtn = $(".btn-restore");
  $("#delete-product-modal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    productId = button.data("id");
  });
  btnDeleteproduct.onclick = function () {
    deleteForm.action =
      "/admin/products/" + productId + "/force?_method=delete";
    deleteForm.submit();
  };
  restoreBtn.click(function (e) {
    e.preventDefault();
    var productId = $(this).data("id");
    restoreForm.action =
      "/admin/products/" + productId + "/restore?_method=PATCH";
    restoreForm.submit();
  });
});
