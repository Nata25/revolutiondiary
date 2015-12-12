// Document.ready()

$(function() {

//  sessionStorage.removeItem('current-day');
//  sessionStorage.removeItem('current-month');

  console.log(sessionStorage.getItem('current-day'));
  console.log(sessionStorage.getItem('current-month'));

  $("#date").html(sessionStorage.getItem('current-day'));
  $("#month").html(sessionStorage.getItem('current-month'));

  // initialize datepicker

$("#datepicker").datepicker(
    {
      dateFormat: "d m",
      defaultDate: new Date(2013, 10, 21),
      minDate: new Date(2013, 10, 21),
      maxDate: new Date(2014, 1, 22),

    // get a date from datepicker:

      onSelect: (function (dateText) {
        var dateChosen = dateText.split(" ");
        var day = dateChosen[0];
        var month = dateChosen[1];

    // change link on go-button according to the selected date
        var newURL = "dates/11/d" + day + "-" + month + "-2015.html";
        $("#page").attr('href', newURL);

    // format date to paste into date-block

        if (month == 11) {
          month = "листопада";
        }
        else if (month == 12) {
          month = "грудня";
        }
        else if (month == 1){
          month = "січня";
        }
        else {
          month = "лютого";
        }

        sessionStorage.setItem('current-day', day);
        sessionStorage.setItem('current-month', month);
        $("#date").html(sessionStorage.getItem('current-day'));
        $("#month").html(sessionStorage.getItem('current-month'));
        console.log(sessionStorage.getItem('current-day'));
        console.log(sessionStorage.getItem('current-month'));

      }) // end of onSelect

    }); // end of .datekpicker()

}); // end of ready
