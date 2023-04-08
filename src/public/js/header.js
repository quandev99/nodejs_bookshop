const searchProduct = document.querySelector(".search-product-input");
const submitSearchProduct = document.querySelector("#submit-search-product");
submitSearchProduct.addEventListener("submit", async (e) => {
  e.preventDefault();
  const searchProductCtr = searchProduct.value;
  const response = await fetch("http://localhost:1999/searchProducts", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const data = await response.json();
  console.log(data);
});
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
