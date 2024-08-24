
window.onload = () => {

  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", (event) => {
    
    const url = window.location.href

    serverRequest(url, "POST", {
      email: email.value,
      password: password.value
    }, (response) => {
      if (response.success) {
        window.location.href = window.location.href.replace("/admin/login", "/admin");
      } else {
        alert("Email or password incorrect. Please try again.")
      }
    })
  })
}
