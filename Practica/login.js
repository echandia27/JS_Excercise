const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", () => {
    localStorage.setItem("isLogged", "true");
    window.location.href = "dashboard.html";
});