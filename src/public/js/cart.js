// JavaScript: Lấy dữ liệu từ cookie và hiển thị trong bảng HTML
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
  // if (orderList === []) return (location.href = "/");

  // Hiển thị danh sách order sản phẩm của mình đã chọn trong bảng HTML
  const tableBody = document
    .getElementById("cart-table")
    .getElementsByTagName("tbody")[0];

  for (let i = 0; i < orderList.length; i++) {
    const order = orderList[i];
    const row = document.createElement("tr");
    row.innerHTML = `   
          <td>
            <span >${i + 1}</span>
            <p class="d-none orderId">${order.id}</p>
          </td>
          <td >
            <div class="d-flex align-items-center">
              <img
                src="${order.image}"
                alt=""
                style="width: 50px; height: 50px"
                class="rounded"
              />
              <div class="ms-3 ml-3">
                <p class="fw-bold mb-1">${order.title}</p>
              </div>
            </div>
          </td>
          <td>
            <p class="fw-normal  text-danger font-weight-bold">${
              order.price
            }đ</p>
          </td>
          <td class="text-center">
            <p class="font-weight-bold">${order.quantity}</p>
          </td>
          <td><p class="text-danger font-weight-bold">${
            order.price * order.quantity
          }đ</p></td>
          <td class="text-center">           
            <a
              href="/order"
              data-id="${order.id}"
              class="btn btn-link btn-sm btn-rounded bg-danger text-white delete-order remove_order"
              data-toggle="modal"
              data-target="#delete-cart-modal"
            >
            <i class="far fa-trash-alt "></i>
            </a>
          </td>        
    `;
    tableBody.appendChild(row);
  }
  let btn = document.querySelectorAll(".remove_order");
  btn?.forEach((item) => {
    item.addEventListener("click", (element) => {
      element.preventDefault();
      console.log("quan");
      orderList.forEach((e) => {
        const idCart =
          element.target.parentNode.parentNode.querySelector(
            ".orderId"
          ).textContent;
        const idOrder = item.getAttribute("data-id");
        console.log("Id lay cach 1: " + idOrder);
        console.log("Id lay cach 2: " + idCart);
        if (idCart == e.id) {
          orderList.splice(orderList.indexOf(e), 1);
          document.cookie = `order=${JSON.stringify(
            orderList
          )}; expires=${new Date(Date.now() + 86400e3).toUTCString()}; path=/`;
          this.location.href = "/order";
        }
      });
    });
  });

  const tfoot = document.getElementsByTagName("tfoot")[0];
  // let arr = [];
  // for (let i = 0; i < orderList.length; i++) {
  //   const element = orderList[i];
  //   const sum = element.quantity * element.price;
  //   arr.push(sum);
  // }
  // let totalAmount = 0;
  // for (const item of arr) {
  //   totalAmount += item;
  // }
  let totalAmount = 0;
  orderList?.forEach((event) => {
    const subtotal = parseInt(event.price) * event.quantity;
    totalAmount += subtotal;
  });
  tfoot.innerHTML = `
    <tr class="">
    <td></td>
      <td></td>
      <td></td>
      <td></td>
        <td class="text-danger">Tổng tiền: <span class="font-weight-bold">${totalAmount} đ</span></td>
        <td class=""><a href="/order/checkout" class="btn btn-link btn-sm btn-rounded bg-success text-white">Thanh Toán</a></td>
    </tr>
  `;
});
