// Lấy dữ liệu từ cookie
const orderCookie = document.cookie.replace(
  /(?:(?:^|.*;\s*)order\s*=\s*([^;]*).*$)|^.*$/,
  "$1"
);
let orderList;
if (orderCookie) {
  orderList = JSON.parse(orderCookie);
} else {
  orderList = [];
}
const CartShop = document.querySelector("#total-quantity");
let cartQuantity = [];
for (let i = 0; i < orderList.length; i++) {
  const element = orderList[i];
  const cart = element.quantity;
  cartQuantity.push(cart);
}
let totalCart = 0;
for (const item of cartQuantity) {
  totalCart += item;
}
CartShop.textContent = totalCart;

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
  if(!data) {
     alert("Bạn không có quyền vào trang này!.");
     return;
  }
  const accessToken = data?.accessToken;
  const isAdmin = data?.user.admin;
  console.log("accessToken", data?.user?.admin);

 
  // Hàm kiểm tra token và vai trò người dùng
  try {
     if (!accessToken || isAdmin == false) {
       alert("Bạn không có quyền vào trang này!.");
       return;
     }
    const response = await fetch("http://localhost:1999/admin", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("response", response);
    if (response) location.href = "/admin";
    return;
  } catch (error) {
    console.error(error);
    location.href = "/";
  }
});
