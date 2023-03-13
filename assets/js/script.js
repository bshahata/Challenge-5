$(function ()
{
   // Time slots required in 24hr clock (0-24)
      let startTime = 9; // inclusive
      let endTime = 18; // exclusive

      // Selectors
      let mainContainerEl = $('.container-lg');
      let dateTimeEl = $('#currentDay');

      // Get current date and time
      let currentDate = new Date().toString();

      // Get current hour
      let currentHour = new Date().getHours();

      // Write current date to header
      dateTimeEl.text(currentDate);

      // This loop will create time slots based on startTime and endTime.  This only runs on load/refresh
      for (let i = startTime; i < endTime; i++) {
        let hour;
        let meridiem;
        let tense;

        // Using 24hr clock - determine meridiem
        meridiem = (i >= 12) ? "PM" : "AM";
        // Convert 24hr clock to 12 hr - If 0 then return 12
        hour = (i % 12) || 12;

        if (i == (currentHour)) {
          tense = "present";
        }

    // Determine the past, present, or future tense of each hour to apply appropriate highlighting to the corresponding time slot.
    if (i == (currentHour))
    {
      tense = "present";
    } else if (i < (currentHour))
    {
      tense = "past";
    } else
    {
      tense = "future";
    }

    // Creates time slot div and supporting children for each hour
    mainContainerEl.append(
      $("<div>", { "id": "hour-" + hour, "class": "row time-block " + tense }).append(
        $("<div>", { "class": "col-2 col-md-1 hour text-center py-3" }).text(hour + meridiem),
        $("<textArea>", { "class": "col-8 col-md-10 description", "rows": "3" }),
        $("<button>", { "class": "btn saveBtn col-2 col-md-1", "aria-label": "save" }).append(
          $("<i>", { "class": "fas fa-save", "aria-hidden": "true" }))));
  }

  // Click listener for the save button
  mainContainerEl.on("click", ".time-block button", function (event)
  {
    // Store input based on div id=hour-? as the key, and user input as the value.
    localStorage.setItem($(this).parent().attr("id"), $(this).parent().children("textArea").val());
    // Then display an acceptance message for a short duration
    mainContainerEl.prepend($("<div>", { "class": "row entry-msg" }).append($("<p>", { "class": "col-12 message text-center text-primary lead py-2" }).text("Appointment saved to localstorage \u2705")));
    setTimeout(function ()
    {
      $('.message').remove();
    }, 2500);
  });

  // Retrieve and display the user input stored in the browser's local storage for each hour, and display it in the corresponding hour's div element
  for (let i = 0; i < localStorage.length; i++)
  {
    $("#" + localStorage.key(i)).children("textArea").text(localStorage.getItem(localStorage.key(i)));
  }
});

// Gets and returns a formatted date and hour
function getDateTime()
{
  let newDate = dayjs();

  return [newDate.hour(), getDayOfWeek(newDate.day()) + ", " + getMonthOfYear(newDate.month()) + " " + getOrdinalDate(newDate.date())];
}

// Switch statementfor days in a week
function getDayOfWeek(day)
{
  switch (day)
  {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
  }

  return day;
}

// Switch statement for months
function getMonthOfYear(month)
{
  switch (month)
  {
    case 0:
      month = "January";
      break;
    case 1:
      month = "February";
      break;
    case 2:
      month = "March";
      break;
    case 3:
      month = "April";
      break;
    case 4:
      month = "May";
      break;
    case 5:
      month = "June";
      break;
    case 6:
      month = "July";
      break;
    case 7:
      month = "August";
      break;
    case 8:
      month = "September";
      break;
    case 9:
      month = "October";
      break;
    case 10:
      month = "November";
      break;
    case 11:
      month = "December";
  }

  return month;
}

