document.addEventListener("DOMContentLoaded", function () {
  var categoryId;
  var deleteForm = document.forms["delete-category-form"];
  var btnDeleteCategory = document.getElementById("btn-delete-category");
  var checkboxAll = $("#checkbox-all");
  var categoryItemCheckbox = $(".form-check-input");
  var checkAllSubmitBtn = $(".check-all-submit-btn");
  $("#delete-category-modal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    categoryId = button.data("id");
  });
  btnDeleteCategory.onclick = function () {
    deleteForm.action =
      "/admin/categories/" + categoryId + "/delete?_method=delete";
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
