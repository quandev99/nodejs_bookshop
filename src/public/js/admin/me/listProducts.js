document.addEventListener("DOMContentLoaded", function () {
  var productId;
  var deleteForm = document.forms["delete-product-form"];
  var btnDeleteProduct = document.getElementById("btn-delete-product");
  var checkboxAll = $("#checkbox-all");
  var productItemCheckbox = $(".form-check-input");
  var checkAllSubmitBtn = $(".check-all-submit-btn");
  $("#delete-product-modal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    productId = button.data("id");
  });
  btnDeleteProduct.onclick = function () {
    deleteForm.action = "/admin/products/" + productId + "?_method=delete";
    deleteForm.submit();
  };
  checkboxAll.change(function () {
    var isCheckedAll = $(this).prop("checked");
    productItemCheckbox.prop("checked", isCheckedAll);
    renderCheckAllSubmitBtn();
  });
  productItemCheckbox.change(function () {
    var isCheckedAll =
      productItemCheckbox.length === $(".form-check-input:checked").length;
    checkboxAll.prop("checked", isCheckedAll);
    renderCheckAllSubmitBtn();
  });
  function renderCheckAllSubmitBtn() {
    var checkedCount = $(".form-check-input:checked").length;
    if (checkedCount > 0) {
      checkAllSubmitBtn.attr("disabled", false);
    } else {
      checkAllSubmitBtn.attr("disabled", true);
    }
  }
  console.log(checkAllSubmitBtn);
});
