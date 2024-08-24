
window.onload = () => {

  document.addEventListener("click", (event) => {
    
    if (event.target.classList.contains("each-session-change-status-submit-button")) {

      popUp("confirm", "Mark as complete?", "Do you confirm that you want to mark this lesson as complete. You can revert this action later.")
        .then(result => {
          if (result) {
          
            const sessionId = event.target.nextSibling.innerHTML;
            const sessionCurrentStage = event.target.nextSibling.nextSibling.innerHTML;
            const url = window.location.href.replace("/tutor/lessons", "/session/edit/stage/tutor");
      
            serverRequest(url, "POST", {
              sessionId: sessionId,
              stage: sessionCurrentStage == "ongoing" ? "completed" : "ongoing"
            }, (response) => {
              if (response.success) popUp("success", "Saved successfully!", "Your action saved successfully.") 
              else popUp("error", "Error occured please try again later.", "We've encountered an error. Please try again later.") 
              
              setTimeout(() => window.location.reload(), 500);
            })
          }
        })
    } else if (event.target.classList.contains("each-session-cancel-submit-button")) {

      popUp("question", "Cancel lesson?", "Do you confirm that you want to cancel this lesson. This action is irreversable.")
        .then(cancelText => {

          const sessionId = event.target.previousSibling.previousSibling.innerHTML;
          const url = window.location.href.replace("/tutor/lessons", "/session/edit/cancel/tutor");

          serverRequest(url, "POST", {
            sessionId: sessionId,
            canceledBy: "tutor",
            cancelMessage: cancelText
          }, (response) => {
            if (response.success) popUp("success", "Saved successfully!", "Lesson canceled successfully.") 
            else popUp("error", "Error occured please try again later.", "We've encountered an error. Please try again later.") 
            
            setTimeout(() => window.location.reload(), 500);
          })
        })
    }
  })
}
