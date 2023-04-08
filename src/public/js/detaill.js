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
  const rating = document.querySelector("#rating").value;
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
  if (data.success === true) {
    alert(data.message);
    console.log(productId);
    return (location.href = `http://localhost:1999/admin/products/${id}`);
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
