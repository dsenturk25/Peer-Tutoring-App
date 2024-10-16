

function validatePassword (password1, password2) {
  if (password1 && password2) {
    if (password1.length >= 8 && password2.length >= 8) {
      if (password1 == password2) {
        return "valid";
      } else {
        return "inconsistent";
      }
    } else {
      return "short"
    }
  } else {
    return "empty";
  }
}

function changePasswordListener () {

  const newPasswordInput = document.getElementById("new-password-input");
  const newPasswordAgainInput = document.getElementById("new-password-again-input");
  const changePasswordSubmitButton = document.getElementById("welcome-wrapper-change-password-button");

  if (newPasswordInput && newPasswordAgainInput && changePasswordSubmitButton) {
    
    changePasswordSubmitButton.addEventListener("click", (event) => {
      const validationResult = validatePassword(newPasswordInput.value, newPasswordAgainInput.value);
      if (validationResult == "empty") {
        popUp("error", "Please fill all the input boxes.");
      } else if (validationResult == "short") {
        popUp("error", "The password should be at least 8 characters.");
      } else if (validationResult == "inconsistent") {
        popUp("error", "Please enter the same password to the boxes.");
      } else if (validationResult == "valid") {


        const url = window.location.href.replace("/tutor", "") + "/auth/tutor/password/change";

        serverRequest(url, "POST", {
          password: newPasswordInput.value
        }, (response) => {
          if (response.success) {
            popUp("success", "Password successfully updated!", "Your password is successfully updated!");
            setTimeout(() => {
              window.location.reload();
            }, 2000)
          }
        })
      }
    })

  }
}
