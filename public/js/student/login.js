
window.onload = () => {

  const email = document.getElementById("email");
  const password = document.getElementById("password");

  const submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", (event) => {

    serverRequest(window.location.href.replace("/student/login", "/auth/student/login"), "POST", {
      email: email.value,
      password: password.value
    }, (response) => {
      if (response.success) {
        window.location.href = "/student"
      } else {
        alert("The email or password you provided is incorrect. Please try again.");
      }
    })
  })

}
