
window.onload = () => {

  changePasswordListener();

  const dateInput = document.getElementById("date-input");
  const startTime = document.getElementById("start-time-input");
  const finishTime = document.getElementById("finish-time-input");

  const submitButton = document.getElementById("add-new-slot");

  submitButton.addEventListener("click", (event) => {

    serverRequest((window.location.href.split("/tutor/")[0] += "/tutor/slot/open"), "POST", {
      date: dateInput.value,
      startTime: startTime.value,
      finishTime: finishTime.value,
      isAvailable: true
    }, (response) => {
      if (response.success) popUp("success", "New slot added!", "An available time slot added to your schedule.");
      else popUp("error", "Couldn't add new slot time!", "There is an issue on our side. Thank you for your understanding.")
      setTimeout(() => {
        window.location.reload();
      }, 500);
    })
  })


  document.addEventListener("mouseover", (eventMouseOver) => {
    if (eventMouseOver.target.classList.contains("each-slot-times-content") && !eventMouseOver.target.classList.contains("each-slot-times-content-not-available")) {

      const timeToBeDeleted = eventMouseOver.target.innerHTML;
      const timeSlotId = eventMouseOver.target.nextSibling.innerHTML;
      
      const deleteTimeOverlapContent = document.createElement("div");
      deleteTimeOverlapContent.classList.add("delete-time-overlap-content");
      deleteTimeOverlapContent.innerHTML = "🗑️"

      eventMouseOver.target.appendChild(deleteTimeOverlapContent)

      deleteTimeOverlapContent.addEventListener("click", (event) => {
        popUp("confirm", "Delete available slot time?", `Do you confirm that you wanna delete the timeslot ${timeToBeDeleted}?`)
          .then(result => {
            if (result) {

              const url = window.location.href.replace("/tutor/slot", "/tutor/slot/delete");
              serverRequest(url, "POST", {
                slotId: timeSlotId
              }, (response) => {
                if (response.success) popUp("success", "Slot deleted!", "Slot successfully deleted. You can open a new slot from this page.");
                else popUp("error", "Couldn't delete slot.", "Currently, there is an issue on our side. Thank you for your understanding.");
                setTimeout(() => {
                  return window.location.reload()
                }, 500);
              })
            }
          })
      })

      eventMouseOver.target.addEventListener("mouseleave", (event) => {
        event.target.removeChild(deleteTimeOverlapContent);
      })
    }
  })
}
