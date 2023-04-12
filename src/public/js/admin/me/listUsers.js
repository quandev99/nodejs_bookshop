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

document.addEventListener("DOMContentLoaded", function () {
  let userId;
  const data = JSON.parse(localStorage.getItem("user"));
  const accessToken = data?.accessToken;
  const btnDeleteUser = document.getElementById("btn-delete-user");

  $("#delete-user-modal").on("show.bs.modal", function (event) {
    const button = $(event.relatedTarget);
    userId = button.data("id");
    btnDeleteUser.onclick = async () => {
      if (!accessToken) {
        alert("Access token not found. Please log in.");
        return;
      }
      const response = await fetch(
        `http://localhost:1999/admin/auth/${userId}/deleteUser`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // Thêm accessToken vào header Authorization
          },
          // body: JSON.stringify({ id: userId }),
        }
      );
      const data = await response.json();
      if (data) {
        location.href = "/admin/me/stored/listUser";
        return;
      } else {
        alert(data.message);
      }
    };
  });
});
