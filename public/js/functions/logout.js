
function logoutButton () {

  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", (event) => {
    serverRequest((window.location.href.split("/tutor/")[0] += "/auth/tutor/logout"), "POST", {data: "data"}, (response) => { window.location.reload() })
  })
}
