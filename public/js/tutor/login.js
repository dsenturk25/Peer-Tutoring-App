
window.onload = () => {

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", (event) => {

    serverRequest(window.location.href.replace("/tutor/login", "/auth/tutor/login"), "POST", {
      email: email.value,
      password: password.value
    }, (response) => {
      if (response.success) {
        window.location.href = "/tutor";
      } else {
        alert("The email or password you provided is incorrect. Please try again.");
      }
    })
  })

}
