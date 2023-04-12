const price = document.querySelectorAll(".price").textContent;

const formattedData1 = Number(price).toLocaleString("en-US");

document.addEventListener("DOMContentLoaded", function () {
  // Hiển thị thời gian tạo
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} - lúc ${hours} giờ : ${minutes} phút`;
  };
  const createdAtElements = document.querySelectorAll(".createdAt");
  for (let i = 0; i < createdAtElements.length; i++) {
    const formattedDate = formatDate(createdAtElements[i].textContent);
    createdAtElements[i].innerText = formattedDate;
  }
  ////
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
});
