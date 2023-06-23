// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?

  var saveButtonEl = $('.saveBtn');

//the save button must be clicked first before we can set localstorage values
  saveButtonEl.on('click', function (event) {
    localStorage.setItem("hour" + (event.target.closest("div").id), (event.target.closest("div").id));

    var actualEventtext = ($($(this).prev()[0]).val());
    localStorage.setItem("event" + (event.target.closest("div").id), actualEventtext);

    //push to array? may not be needed
    //getLocalStorageValues();
    
  });

// var testingforhour = localStorage.getItem("hour");
// console.log(testingforhour)



  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?

  var hourElement = $('[id^="hour-"]');
  //var currenthour = dayjs(11); //just for testing that the page does show colors before 5pm

  var currenthour = dayjs().hour()

  //console.log(currenthour);

// For each hour element, strip out the id to determine the hour of it and diff it against the current hour to determine class to place on it
    //console.log(hourinElement.diff(currenthour));
  //if the value is negative, it is in the past
  //if the value is 0, it is now
  //if the value is postive, it is in the future
  // loop through all elements with hour-, etc and do the difference. then color code accordingly

  hourElement.each( function () {
    //console.log(this.id.replace('hour-', '')); // get string of the hour part of the id
    //console.log(parseInt((this.id.replace('hour-', '')))); //gets integer from the id
    //console.log(dayjs((parseInt((this.id.replace('hour-', ''))))).diff(currenthour)); //gets the id number's diff from current hour

    var diffFromCurrentHour = (dayjs((parseInt((this.id.replace('hour-', ''))))).diff(currenthour));

    if (diffFromCurrentHour === 0) {
      //console.log("It is the current hour!");
      $(this).addClass("present");
    }
    else if (diffFromCurrentHour > 0) {
      //console.log("This time is in the future");
      $(this).addClass("future");
    }
    else {
      //console.log("This time is on the past");
      $(this).addClass("past");
    }
    

  })





  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?

  function getLocalStorageValues() {
    // console.log(localStorage.getItem("hour"));
    // console.log(localStorage.getItem("event"));

    hourElement.each( function () {
      //console.log($(this).attr('id')); // gets the ids of each element
      //console.log(typeof($(this).attr('id'))); //the ids are strings
      //console.log(typeof($(this).attr('id')));

      var hourID = localStorage.getItem("hour" + ($(this).attr('id')));
      //var hour = hourID.replace('hour-', '');
      //var eventText = localStorage.getItem("event"); 
      
      // console.log(hour);
      // console.log(eventText);
      //console.log(hourID);

      var hourElementid = ($(this).attr('id'));
      if (hourElementid === hourID) {
        //console.log(localStorage.getItem("event"));
        $(this).find('.description').text(localStorage.getItem("event" + ($(this).attr('id')))); // finds direct description element and puts text there
      }
    })
    }

  //
  // TODO: Add code to display the current date in the header of the page.
  function getDate() {
    //https://day.js.org/docs/en/display/format 
    var currentDate = (dayjs().format('dddd MMMM DD YYYY'));
    //console.log(currentDate);
    //take currentDate and place into id="currentDay" 
    var currentDayEl = $("#currentDay");
    //currentDayEl.innerHTML = currentDate;
    //console.log(currentDayEl.text());
    currentDayEl.text(currentDate);
  }
  
  getDate();
  getLocalStorageValues();
  
});


