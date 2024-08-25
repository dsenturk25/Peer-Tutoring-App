
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
        popUp("success", "Successfully logged in!", "You will proceed to student platform in a second.");
        setTimeout(() => {
          window.location.href = "/student"
        }, 500);
      } else {
        popUp("error", "Your email or password is incorrect", "Please check your credentials and try again.");
      }
    })
  })

}
