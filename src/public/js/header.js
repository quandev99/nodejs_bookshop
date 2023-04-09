// const searchProduct = document.querySelector(".search-product-input");
// const submitSearchProduct = document.querySelector("#submit-search-product");
// submitSearchProduct.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const searchProductCtr = searchProduct.value;
//   const response = await fetch("http://localhost:1999/searchProducts", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });
//   const data = await response.json();
//   console.log(data);
// });

// -----------------
const user = JSON.parse(localStorage.getItem("user"));
const nameLogin = document.querySelector(".nameLogin");
const userAvatar = document.querySelector(".user-avatar");
if (user?.user.userName && user?.user.avatar) {
  const srcAvatarUser = user.user.avatar;
  nameLogin.textContent = user.user.userName;
  userAvatar.src = srcAvatarUser;
}
const logoutBtn = document.querySelector(".logoutBtn");
logoutBtn &&
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    alert("Đăng xuất thành công!");
    location.href = "/";
  });

document.addEventListener("DOMContentLoaded", async function () {
  ////-----------------
  const admin = document.getElementById("admin");
  admin.addEventListener("click", async (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("user"));
    const accessToken = data?.accessToken;
    console.log("accessToken", accessToken); // đã sửa để sử dụng dấu phẩy thay vì ghép chuỗi
    if (!accessToken) {
      alert("Access token not found. Please log in.");
      location.href = "/";
      return;
    }
    // Hàm kiểm tra token và vai trò người dùng
    await fetch("http://localhost:1999/admin", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // đã sửa để sử dụng "Authorization" thay vì "token"
      },
    });
    location.href = "/admin";
    return;
  });
});
