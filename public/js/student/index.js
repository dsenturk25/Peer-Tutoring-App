
window.onload = () => {
  logoutButton();

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("slot-time-occupied")) {
      popUp("error", "Sorry, this session is occupied.", "This time slot is occupied. Please try for other time slot options.")
    } else if (event.target.classList.contains("each-slot-times-content")) {
      popUp("confirm", "Create a lesson?", "You are about to create a meeting. Do you confirm you want to proceed?")
        .then(result => {
          if (result) {
            serverRequest((window.location.href.replace("/student", "/session/create")), "POST", {
              tutorId: event.target.nextSibling.innerHTML,
              date: event.target.previousSibling.innerHTML,
              startTime: event.target.innerHTML.split("-")[0],
              finishTime: event.target.innerHTML.split("-")[1],
              availableTimeId: event.target.nextSibling.nextSibling.innerHTML
            }, (response) => {
              if (response.success) popUp("success", "You're all set.", "Your lesson is arranged. Please go to lessons page to move on.");
              popUp("error", "Something went wrong.", "Your lesson can't be arranged. Please try again later.");
              window.location.reload();
            })
          }
        })
    }
  })
}
