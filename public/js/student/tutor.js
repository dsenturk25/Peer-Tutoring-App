
window.onload = () => {

  logoutButton();


  const createLessonAbsoluteWrapper = document.getElementById("create-lesson-absolute-wrapper");
  const createMeetingSubmitButton = document.getElementById("create-meeting-submit-button");

  createMeetingSubmitButton.addEventListener("click", (event) => {

    createLessonAbsoluteWrapper.style.display = "flex";
    setTimeout(() => {
      createLessonAbsoluteWrapper.style.filter = "opacity(1)";
    }, 10)
  })

  const cancelCreateMeetingButton = document.getElementById("cancel-create-meeting-submit-button");
  cancelCreateMeetingButton.addEventListener("click", (event) => {

    createLessonAbsoluteWrapper.style.filter = "opacity(0)";
    setTimeout(() => {
      createLessonAbsoluteWrapper.style.display = "none";
    }, 250)
  })


  const createLessonTimeDisplayContent = document.getElementById("create-lesson-time-display-content");
  
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("each-available-day-content")) {

      createLessonTimeDisplayContent.innerHTML = "";
      
      let sessionDateRaw = event.target.nextSibling.children[0].innerHTML;
      let sessionDate = (new Date(sessionDateRaw)).toLocaleDateString("en-EN", {day: "numeric", month: "long", weekday: "long"})
      const tutorZoomLink = event.target.nextSibling.children[1].innerHTML;
      const tutorNameSurname = event.target.nextSibling.children[2].innerHTML;
      const availableTimes = event.target.nextSibling.children[3].children;
      const tutorId = event.target.nextSibling.children[4].innerHTML;
      
      const tutorNameSurnameDiv = document.createElement("div");
      tutorNameSurnameDiv.innerHTML = tutorNameSurname;
      tutorNameSurnameDiv.classList.add("create-lesson-tutor-name-surname");

      const tutorZoomLinkDiv = document.createElement("a");
      tutorZoomLinkDiv.innerHTML = "📹 Zoom";
      tutorZoomLinkDiv.a = tutorZoomLink;
      tutorZoomLinkDiv.classList.add("create-lesson-tutor-zoom-link");

      const sessionDateDiv = document.createElement("div");
      sessionDateDiv.innerHTML = sessionDate;
      sessionDateDiv.classList.add("create-lesson-tutor-session-date");
      
      createLessonTimeDisplayContent.appendChild(tutorNameSurnameDiv);
      createLessonTimeDisplayContent.appendChild(sessionDateDiv);
      createLessonTimeDisplayContent.appendChild(tutorZoomLinkDiv);

      const tutorDisplayTimesDisplayContent = document.createElement("div");
      tutorDisplayTimesDisplayContent.classList.add("tutor-display-times-display-content");

      createLessonTimeDisplayContent.appendChild(tutorDisplayTimesDisplayContent);

      for (let i = 0; i < availableTimes.length; i++) {
        const eachTime = availableTimes[i].innerHTML.split("_")[0];
        const eachTimeIsAvailable = availableTimes[i].innerHTML.split("_")[1] == "true" ? true : false;
        
        const eachTimeDiv = document.createElement("div");
        eachTimeDiv.innerHTML = eachTime;
        eachTimeDiv.classList.add("create-lesson-tutor-session-time");
        tutorDisplayTimesDisplayContent.appendChild(eachTimeDiv);
        !eachTimeIsAvailable ? eachTimeDiv.style.backgroundColor = "#6687ff" : "";
        !eachTimeIsAvailable ? eachTimeDiv.style.color = "#fff" : "";

        eachTimeDiv.addEventListener("click", (event) => {
          if (eachTimeIsAvailable) {

            popUp("confirm", "Create a lesson?", `Do you confirm you want to create a lesson on ${sessionDate}, between ${eachTime} and with ${tutorNameSurname}?`)
              .then(result => {

                if (result) {

                  const url = window.location.href.split("/student/tutor/personal")[0] + "/session/create";
                  serverRequest(url, "POST", {
                    tutorId: tutorId,
                    date: sessionDateRaw,
                    startTime: eachTimeDiv.innerHTML.split("-")[0],
                    finishTime: eachTimeDiv.innerHTML.split("-")[1],
                    availableTimeId: availableTimes[i].innerHTML.split("_")[2],
                  }, (response) => {
                    if (response.success) popUp("success", "Lesson successfully created!", "Lesson is created. You can go to lesson page to view details.");
                    else popUp("error", "Couldn't create lesson!", "Currently, we are facing an issue. Thank you for your understanding.");
                    setTimeout(() => {
                      window.location.reload();
                    }, 500);
                  })
                }
              })

          } else return popUp("error", "This slot is occupied.", "This slot is taken by another student. Please try taking another slot.");
        })
      }
    }
  })
}
