const loginForm = document.querySelector("#form-login");
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const username = document.querySelector(".username").value;
  const password = document.querySelector(".password").value;
  const response = await fetch("http://localhost:1999/admin/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password: password, userName: username }),
  });
  const data = await response.json();
  if (data.user) {
    localStorage.setItem("user", JSON.stringify(data));
    alert(data.message);
    location.href = "/";
  } else {
    alert(data.message);
  }
});
