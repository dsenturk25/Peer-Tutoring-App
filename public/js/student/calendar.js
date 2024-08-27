
document.addEventListener('DOMContentLoaded', function() {

  logoutButton();

  const url = window.location.href;

  serverRequest(url, "POST", {}, (response) => {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: response.calendarData,
      eventClick: function(info) {

        const tutor = info.event.extendedProps.tutor;
        const session = info.event.extendedProps.session;
        
        const pageX = info.jsEvent.pageX - 150;
        const pageY = info.jsEvent.pageY - 120;

        const lessonDetailsWrapper = document.createElement("div");
        lessonDetailsWrapper.classList.add("lesson-details-wrapper-absolute")
        lessonDetailsWrapper.style.left = `${pageX}px`
        lessonDetailsWrapper.style.top = `${pageY}px`

        const sessionTitleWrapper = document.createElement("div");
        sessionTitleWrapper.classList.add("session-title-wrapper");

        const sessionTitle = document.createElement("div");
        sessionTitle.classList.add("session-title");
        const circleBackgroundColor = session.stage == "ongoing" ? "lightblue" : session.stage == "completed" ? "lightgreen" : session.stage == "canceled" ? "lightcoral" : "";
        
        const stageCircleIndicator = document.createElement("div");
        stageCircleIndicator.classList.add("stage-circle-indicator");
        stageCircleIndicator.style.backgroundColor = circleBackgroundColor;

        sessionTitle.innerHTML = `${session.stage.charAt(0).toUpperCase() + session.stage.slice(1)} Lesson w/ ${tutor.name} ${tutor.surname}`;

        sessionTitleWrapper.appendChild(stageCircleIndicator);
        sessionTitleWrapper.appendChild(sessionTitle);

        const sessionDateWrapper = document.createElement("div");
        sessionDateWrapper.classList.add("session-date-wrapper");
        const sessionDateMainDateContent = document.createElement("div");
        sessionDateMainDateContent.classList.add("session-date-main-date-content");
        sessionDateMainDateContent.innerHTML = new Date(session.date).toLocaleString("en-US", { month: "short", day: "numeric" });

        const sessionDateOtherDateLinkContent = document.createElement("div");
        sessionDateOtherDateLinkContent.classList.add("session-date-other-date-link-content");

        const sessionDateOtherDateLinkDayAndTimeContent = document.createElement("div");
        sessionDateOtherDateLinkDayAndTimeContent.innerHTML = `${new Date(session.date).toLocaleString("en-US", { weekday: "long" })} - ${session.startTime} - ${session.finishTime}`
        sessionDateOtherDateLinkDayAndTimeContent.classList.add("session-date-other-date-link-day-and-time-content");

        const sessionDateOtherDateLinkZoomLinkContent = document.createElement("a");
        sessionDateOtherDateLinkZoomLinkContent.href = tutor.link;
        sessionDateOtherDateLinkZoomLinkContent.target = "_blank";
        sessionDateOtherDateLinkZoomLinkContent.classList.add("session-zoom-link-content")
        sessionDateOtherDateLinkZoomLinkContent.innerHTML = "Click To Join";

        sessionDateOtherDateLinkContent.appendChild(sessionDateOtherDateLinkDayAndTimeContent);
        sessionDateOtherDateLinkContent.appendChild(sessionDateOtherDateLinkZoomLinkContent);

        sessionDateWrapper.appendChild(sessionDateMainDateContent);
        sessionDateWrapper.appendChild(sessionDateOtherDateLinkContent);

        lessonDetailsWrapper.appendChild(sessionTitleWrapper);
        lessonDetailsWrapper.appendChild(sessionDateWrapper);

        document.body.appendChild(lessonDetailsWrapper);

        setTimeout(() => {
          document.addEventListener("click", (event) => {
            document.body.removeChild(lessonDetailsWrapper);
          })
        }, 500)
      }
    });
    calendar.render();
  })
});
