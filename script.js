$(document).ready(function () {

  //create array for time
  var timeArray = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"];
  //               / 0       1       2       3       4     5      6      7      8

  //create the planner
  function makeThePlanner() {
    var tableDiv = $("<table>");
    //adding moment.js for current day of the week, month, day of the month, year, and time
    var m = moment().format("LLLL");
    $("#currentDay").text(m);
    console.log(m);
    
    //get only the hour of current time of day
    var currentTime = moment().format("h");
    console.log(currentTime);

    //loop through time array
    for (var i = 0; i < timeArray.length; i++) {

      //create all variables for the elements needed for the planner
      var hourRow = $("<tr>")
      var timeColumn = $("<td>" + timeArray[i] + "</td>");
      var eventColumn = $("<td>");
      var saveColumn = $("<td>");
      var formDiv = $("<form>");
      var userInputArea = $("<textarea style=border:none>");
      var saveBtn = $("<button>" + "Save" + "</button>");

      //append each element
      tableDiv.append(hourRow);
      hourRow.append(timeColumn);
      hourRow.append(eventColumn);
      hourRow.append(saveColumn);
      formDiv.append(userInputArea);
      saveColumn.append(saveBtn);
      eventColumn.append(formDiv);

      //set the attributes using the index
      hourRow.attr("class", [i]);
      saveBtn.attr("data-index", [i]);
      formDiv.attr("id", [i]);

      //edit css
      timeColumn.attr("style", "background-color:white;color:black;border-bottom:solid 2px; padding: 20px");
      saveColumn.attr("style", "padding:20px;border:5px solid cyan");
      eventColumn.attr("style", "border-bottom:solid 2px;border-top:solid 2px;height:100px;");
      tableDiv.attr("style", "margin-left:auto;margin-right:auto");
      saveBtn.attr("style", "background-color:black;color:lime");

      //add classes
      timeColumn.addClass("time-block")
      saveColumn.addClass("saveBtn");
      formDiv.addClass("form-group")

      if (currentTime > saveBtn.attr("data-index")) {
        hourRow.attr("style", "background-color:lime");
        console.log(saveBtn.attr("data-index"));
      } else if (currentTime < saveBtn.attr("data-index")) {
        hourRow.attr("style", "background-color:pink");
      } else {
        hourRow.attr("style", "background-color:red");
      }
  }
    $(".container").append(tableDiv);
  }
  makeThePlanner();
  displaySavedEvent();

  $("button").on("click", function () {
    rowSelected = $(this).attr("data-index");
    console.log("row selected:" + rowSelected);
    localStorage.setItem("rowChosen", rowSelected);
    var formSelected = $("form#" + rowSelected);
    console.log("form selected:" + formSelected);
    var InputArea = formSelected.children().val();
    console.log("inputArea:" + InputArea);
    var localKey = "text" + rowSelected;
    localStorage.setItem(localKey, InputArea);
    displaySavedEvent();
  })

  function displaySavedEvent() {
    for (var i = 0; i < timeArray.length; i++) {
      var key = "text" + [i];
      var storedEvents = localStorage.getItem(key);
      $("form#" + [i]).children().text(storedEvents);
    }
  }
});