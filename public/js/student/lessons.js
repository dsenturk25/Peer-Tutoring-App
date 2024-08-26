
window.onload = () => {
  logoutButton();

  document.addEventListener("change", (event) => {

    if (event.target.classList.contains("each-session-actions-rate-lesson")) {
      const sliderValue = event.target.value;
      const ratingContent = event.target.parentNode.previousSibling.children[1];
      ratingContent.innerHTML = sliderValue;
      ratingContent.style.backgroundColor = sliderValue <= 1 ? "orangered" : sliderValue <= 2.5 ? "orange" : sliderValue <= 4 ? "yellow" : sliderValue <= 5 ? "lightgreen" : "gray";
    }
  })


  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("save-feedback-submit-button")) {
      const rating = event.target.previousSibling.previousSibling.value;
      const feedbackText = event.target.previousSibling.children[0].value;
      const sessionId = event.target.nextSibling.innerHTML;

      if (rating && feedbackText && sessionId) {
        popUp("confirm", "Give a feedback?", `Are you sure rating this tutor with ${rating} out of 5, reasoning it as "${feedbackText}?"`)
          .then(result => {
            if (result) {
              
              const url = window.location.href.replace("/student/lessons", "/session/edit/give-feedback");
              serverRequest(url, "POST", {
                rating: parseFloat(rating),
                feedbackText: feedbackText,
                sessionId: sessionId
              }, (response) => {
                if (response.success) popUp("success", "You're feedback is saved!", "Thank you for helping us improve ourselves. Your feedback will influence the success of tutors too!");
                else popUp("error", "Couldn't save your feedback.", "There is an issue on our side. Thank you for your understanding.");
              })
            }
          })
      } else {
        popUp("error", "Please enter all required fields.", "In order to give a proper feedback for improvement, please fill all required fields.")
      }
    } else if (event.target.classList.contains("each-session-actions-cancel-lesson")) {
      const sessionId = event.target.nextSibling.innerHTML;

      popUp("question", "Cancel lesson?", "You're about the cancel this lesson. Please declare a reasoning for your action so your tutor can be aware.")
        .then(cancelMessage => {

          const url = window.location.href.replace("/student/lessons", "/session/edit/cancel/student");
          serverRequest(url, "POST", {
            sessionId: sessionId,
            cancelMessage: cancelMessage,
            canceledBy: "student"
          }, (response) => {
            if (response.success) popUp("success", "Lesson canceled!", "The lesson is successfully canceled. We will let your tutor know.");
            else popUp("error", "Couldn't cancel lesson.", "Currently, we are having an issue. Thank you for your understanding.");
            setTimeout(() => {
              window.location.reload();
            }, 500)
          })
        })
      // edit/cancel/student
    }
  })

}
