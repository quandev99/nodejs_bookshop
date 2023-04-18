// Số sao trung bình và lượt đánh giá sản phẩm
const averageScore = document.querySelector(".average_score").textContent;
function starRating(averageScore, maxRating) {
  const fullStars = Math.round(averageScore);
  const halfStar = averageScore - fullStars >= 0.5;
  const emptyStars = maxRating - fullStars - (halfStar ? 1 : 0);
  const stars = [];
  for (let i = 0; i < fullStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    star.setAttribute("key", `star-${i}`);
    stars.push(star);
  }
  if (halfStar) {
    const halfStar = document.createElement("i");
    halfStar.classList.add("fa", "fa-star-half-alt");
    halfStar.setAttribute("key", "half-star");
    stars.push(halfStar);
  }
  for (let i = 0; i < emptyStars; i++) {
    const star = document.createElement("i");
    star.classList.add("fa", "fa-star");
    star.setAttribute("key", `empty-star-${i}`);
    star.style.opacity = "0.3";
    stars.push(star);
  }
  const starsDiv = document.createElement("div");
  starsDiv.classList.add("stars", "text-danger");
  stars.forEach((star) => starsDiv.appendChild(star));
  return starsDiv;
}
const averageScoreStar = document.querySelector(".average_score-star");
averageScoreStar.appendChild(starRating(averageScore, 5));

/////// đánh giá số sao
let selectedStars = 0;
function rate(stars) {
  selectedStars = stars;
  displayResult();
}
function displayResult() {
  const resultElement = document.getElementById("rating");
  resultElement.innerHTML = selectedStars;
  const starElements = document.getElementsByClassName("star");
  for (let i = 0; i < starElements.length; i++) {
    if (i < selectedStars) {
      starElements[i].classList.add("selected-star");
    } else {
      starElements[i].classList.remove("selected-star");
    }
  }
}

// Mặc định hiển thị 5 sao đỏ
window.onload = function () {
  rate(5);
};

// Đánh giá số sao và bình luận sản phẩm
const formComment = document.querySelector("#form-comment");
formComment?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const url = location.href;
  const id = url.split("/")[5];
  const user = JSON.parse(localStorage.getItem("user"));
  const userName = user?.user?.userName;
  const userImage = user?.user?.avatar;
  const productId = document.querySelector("#productId").value;
  const rating = document.querySelector("#rating").textContent;
  const review = document.querySelector("#review").value.trim();
  const userNameCtr = (document.querySelector("#userName").value = userName);
  const userImageCtr = (document.querySelector("#userImage").value = userImage);
  const response = await fetch(`http://localhost:1999/comment/${productId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rating: rating,
      review: review,
      productId: productId,
      userName: userNameCtr,
      userImage: userImageCtr,
    }),
  });
  const data = await response.json();
  if (data.success) {
    alert(data.message);
    location.href = `http://localhost:1999/admin/products/${id}`;
    return;
  } else {
    alert(data?.message);
    return;
  }
});

//// ----- Hiển thị thị tất cả số sao và bình luận của người dùng đã đánh giá sản phẩm ----
ratings = document.querySelectorAll(".rating");
[...ratings].forEach((item) => {
  const listRating = item.nextElementSibling;
  const parsedRating = parseInt(item.textContent.trim());
  let stars = "";
  for (let i = 0; i < parsedRating; i++) {
    stars += `<i class="text-danger fa fa-star"></i>`;
  }
  for (let i = parsedRating; i < 5; i++) {
    stars += `<i class="text-muted fa
  fa-star"></i>`;
  }
  listRating.innerHTML = stars;
});

/// Hiển thị thời gian người dùng bình luận
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

// Mua hàng

let soLuong = 1; // Giá trị mặc định của số lượng là 1

// Hàm thực hiện việc giảm số lượng sản phẩm
const truSoLuong = () => {
  if (soLuong > 1) {
    // Giảm số lượng nếu số lượng > 1
    soLuong--;
    capNhatSoLuong();
  }
};

// Hàm thực hiện việc tăng số lượng sản phẩm
const congSoLuong = () => {
  soLuong++; // Tăng số lượng lên 1
  capNhatSoLuong();
};

// Hàm cập nhật giá trị số lượng lên giao diện
const capNhatSoLuong = () => {
  document.getElementById("soLuong").value = soLuong;
};

// Hàm kiểm tra số lượng không được nhập số âm
const kiemTraSoAm = () => {
  if (soLuong < 1) {
    soLuong = 1;
    capNhatSoLuong();
  }
};

// Hàm xử lý sự kiện khi giá trị input thay đổi
const inputOnChange = (event) => {
  soLuong = event.target.value;
  kiemTraSoAm();
};

// // Add-to-cart
// document.addEventListener("DOMContentLoaded", function () {
//   const addToCart = document.getElementById("add-to-cart");
//   const productId = addToCart?.getAttribute("data-product-id");
//   const quantity = document.getElementById("soLuong");
//   const priceText = document.getElementById("price").textContent;
//   const image = document.getElementById("image").src;
//   const title = document.getElementById("title").textContent;

//   function chuyenDoiGiaTriTien(priceText) {
//     var giaTriTienKhongDauPhay = priceText.replace(/,/g, "");
//     giaTriTienKhongDauPhay = giaTriTienKhongDauPhay.replace(/đ/g, "");
//     var giaTriSoNguyen = parseInt(giaTriTienKhongDauPhay);
//     return giaTriSoNguyen;
//   }

//   var priceNumber = chuyenDoiGiaTriTien(priceText);

//   addToCart?.addEventListener("click", (e) => {
//     e.preventDefault();
//     const quantityNumber = parseInt(quantity.value);
//     const orderCookie = document.cookie.replace(
//       /(?:(?:^|.*;\s*)order\s*\=\s*([^;]*).*$)|^.*$/,
//       "$1"
//     );
//     let order;
//     if (orderCookie) {
//       order = JSON.parse(orderCookie);
//       order.quantity += quantityNumber;
//     } else {
//       order = {
//         id: productId,
//         title: title,
//         image: image,
//         price: priceNumber,
//         quantity: quantityNumber,
//       };
//     }
//     document.cookie = `order=${JSON.stringify(order)}; expires=${new Date(
//       Date.now() + 86400e3
//     ).toUTCString()}; path=/`;
//     alert(`Bạn đã thêm ${quantityNumber} sản phẩm thành công !`);
//     location.href = "/order";
//   });
// });

// Add-to-cart
document.addEventListener("DOMContentLoaded", function () {
  const addToCart = document.getElementById("add-to-cart");
  const productId = addToCart?.getAttribute("data-product-id");
  const quantity = document.getElementById("soLuong");
  const priceText = document.getElementById("price").textContent;
  const image = document.getElementById("image").src;
  const title = document.getElementById("title").textContent;

  function chuyenDoiGiaTriTien(priceText) {
    var giaTriTienKhongDauPhay = priceText.replace(/,/g, "");
    giaTriTienKhongDauPhay = giaTriTienKhongDauPhay.replace(/đ/g, "");
    var giaTriSoNguyen = parseInt(giaTriTienKhongDauPhay);
    return giaTriSoNguyen;
  }

  var priceNumber = chuyenDoiGiaTriTien(priceText);

  addToCart?.addEventListener("click", (e) => {
    e.preventDefault();
    const quantityNumber = parseInt(quantity.value);
    const orderCookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)order\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    let order;
    if (orderCookie) {
      order = JSON.parse(orderCookie);
      const productIndex = order.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        order[productIndex].quantity += quantityNumber;
      } else {
        order.push({
          id: productId,
          title: title,
          image: image,
          price: priceNumber,
          quantity: quantityNumber,
        });
      }
    } else {
      order = [
        {
          id: productId,
          title: title,
          image: image,
          price: priceNumber,
          quantity: quantityNumber,
        },
      ];
    }
    document.cookie = `order=${JSON.stringify(order)}; expires=${new Date(
      Date.now() + 86400e3
    ).toUTCString()}; path=/`;
    alert(`Bạn đã thêm ${quantityNumber} sản phẩm thành công !`);
    location.href = "/order";
  });
});
