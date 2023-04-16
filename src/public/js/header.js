// const searchProduct = document.querySelector(".search-product-input");
// const submitSearchProduct = document.querySelector("#submit-search-product");
// submitSearchProduct.addEventListener("click", async (e) => {
//   e.preventDefault();
//   const searchProductCtr = searchProduct.value;
//   const response = await fetch("http://localhost:1999/searchProducts", {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(searchProductCtr),
//   });
//   const data = await response.json();
//   console.log(data);
// });

// Hàm để xóa cookie với tên là "refreshToken"
function deleteRefreshTokenCookie() {
  document.cookie =
    "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
}
// -----------------
const user = JSON.parse(localStorage.getItem("user"));
const nameLogin = document.querySelector(".nameLogin");
const userAvatar = document.querySelector(".user-avatar");
if (user?.user?.userName && user?.user?.avatar) {
  const srcAvatarUser = user?.user?.avatar;
  nameLogin.textContent = user?.user?.userName;
  userAvatar.src = srcAvatarUser;
}
const logoutBtn = document.querySelector(".logoutBtn");
logoutBtn &&
  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.clear();
    deleteRefreshTokenCookie();
    alert("Đăng xuất thành công!");
    location.href = "/";
  });

const admin = document.getElementById("admin");
admin.addEventListener("click", async (e) => {
  e.preventDefault();
  const data = JSON.parse(localStorage.getItem("user"));
  const accessToken = data?.accessToken;

  if (!accessToken || !data?.user.admin) {
    alert("Bạn không có quyền vào trang này!.");
    // location.href = "/";
    return;
  }
  // Hàm kiểm tra token và vai trò người dùng
  try {
    const response = await fetch("http://localhost:1999/admin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    location.href = "/admin";
    return;
  } catch (error) {
    console.error(error);
    location.href = "/";
  }
});
