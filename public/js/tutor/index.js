
document.addEventListener('DOMContentLoaded', function() {

  logoutButton();

  const url = window.location.href + "/available-times/get";

  serverRequest(url, "POST", {}, (response) => {

    var calendarEl = document.getElementById('calendar');
    var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: 'dayGridMonth',
      events: response.availableTimes
    });
    calendar.render();
  })
});
