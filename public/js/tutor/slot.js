
window.onload = () => {

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
}
