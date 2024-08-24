
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
      if (response.success) return window.location.reload();
      else return alert("Couldn't open the slot, please try again.");
    })
  })
}
