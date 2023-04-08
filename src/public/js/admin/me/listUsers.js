document.addEventListener("DOMContentLoaded", function () {
  let userId;
  const user = JSON.parse(localStorage.getItem("user"));
  const accessToken = user?.accessToken;
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
          body: JSON.stringify({ id: userId }),
        }
      );
      const data = await response.json();
      if (data) {
        location.href = "/admin/me/stored/listUser";
      } else {
        alert(data.message);
      }
    };
  });
});
