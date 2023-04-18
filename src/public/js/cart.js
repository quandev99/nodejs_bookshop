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

  // Hiển thị dữ liệu trong bảng HTML
  const tableBody = document
    .getElementById("cart-table")
    .getElementsByTagName("tbody")[0];

  for (let i = 0; i < orderList.length; i++) {
    const order = orderList[i];
    const row = document.createElement("tr");
    row.innerHTML = `   
          <td>
            <span >${i + 1}</span>
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
              href="#"
              data-id="${order.id}"
              class="btn btn-link btn-sm btn-rounded bg-danger text-white delete-order"
              data-toggle="modal"
              data-target="#delete-cart-modal"
            ><i class="far fa-trash-alt"></i></a>
          </td>        
    `;
    tableBody.appendChild(row);
  }
  const tfoot = document.getElementsByTagName("tfoot")[0];
  let arr = [];
  for (let i = 0; i < orderList.length; i++) {
    const element = orderList[i];
    const sum = element.quantity * element.price;
    arr.push(sum);
  }
  let sum = 0;
  for (const so of arr) {
    sum += so;
  }
  tfoot.innerHTML = `
    <tr class="">
    <td></td>
      <td></td>
      <td></td>
      <td></td>
        <td class="text-danger">Tổng tiền: <span class="font-weight-bold">${sum} đ</span></td>
        <td class=""><a href="/order/checkout" class="btn btn-link btn-sm btn-rounded bg-danger text-white ">Thanh Toán</a></td>
    </tr>
  `;
});

// // Function to get the value of a cookie by its name
// function getCookie(cookieName) {
//   const cookies = document.cookie.split("; ");
//   for (let i = 0; i < cookies.length; i++) {
//     const cookie = cookies[i].split("=");
//     const name = decodeURIComponent(cookie[0]);
//     const value = decodeURIComponent(cookie[1]);
//     if (name === cookieName) {
//       return value;
//     }
//   }
//   return null;
// }
// // Usage
// const orderCookie = getCookie("order");
// if (orderCookie) {
//   const order = JSON.parse(orderCookie);
//   order.forEach((element) => {
//     console.log(element);
//   });
// }
