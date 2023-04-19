document.addEventListener("DOMContentLoaded", function () {
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

  // Hiển thị danh sách order sản phẩm của mình đã chọn trong bảng HTML
  const tableBody = document
    .querySelector(".list-order")
    .getElementsByTagName("div")[0];

  for (let i = 0; i < orderList.length; i++) {
    const order = orderList[i];
    const row = document.createElement("div");
    row.classList.add(
      "d-flex",
      "align-items-center",
      "mb-2",
      "border-bottom",
      "pb-2"
    );
    row.innerHTML = ` 
      <div class="d-flex align-items-center">
        <img
          src="${order.image}"
          alt=""
          style="width: 50px; height: 50px"
          class="rounded"
        />
        <div class="mr-2">
          <span class="fw-bold mb-1 text-truncate d-block" style="font-size:15px;width:150px">${order.title}</span>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <p>Sl:<span class="font-weight-bold mx-2">${order.quantity} </span></p> 
        <p>X <span class="fw-normal  text-danger font-weight-bold">${order.price} </span>đ</p> 
      </div>    
    `;
    tableBody.appendChild(row);
  }
  const tagSumPrice = document.querySelector(".sum-price");
  let arr = [];
  for (let i = 0; i < orderList.length; i++) {
    const element = orderList[i];
    const sum = element.quantity * element.price;
    arr.push(sum);
  }
  let sum = 0;
  for (const item of arr) {
    sum += item;
  }
  tagSumPrice.innerHTML = `<td class="text-danger mr-2">Tổng số tiền: <span class="font-weight-bold text-danger">${sum}</span> đ</td>`;

  // Điền thông tin và checkout vào đơn hàng
  const button = document.querySelector("#button");
  button?.addEventListener("click", async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user?.user?._id;
    const avatar = user?.user?.avatar;
    const totalQuantity = document.getElementById("total-quantity").textContent;
    const userName = document.getElementById("userName").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    console.log("Value:" + userName + email + address + phone);
    const data = await axios.post("/order/addCart", {
      userId: userId,
      userName: userName,
      totalQuantity: totalQuantity,
      avatar: avatar,
      email: email,
      address: address,
      phone: phone,
      products: orderList,
      totalAmount: sum,
    });
    try {
      if (data?.data?.success == true) {
        alert(data?.data.message);
        location.href = "/";
        return;
      } else {
        alert(data?.data?.message);
        location.href = "/";
        return;
      }
    } catch {
      console.error(error); // Xử lý lỗi nếu có
    }
  });
});
