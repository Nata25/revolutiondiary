// set session storage

sessionStorage.setItem('name', 'Name');

// initialize datepicker
$(function() {
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
          month = "ЛИСТОПАДА";
        }
        else if (month == 12) {
          month = "ГРУДНЯ"
        }
        else {
          month = "СІЧНЯ"
        }

        $("#date").html(day);
        $("#month").html(month);

        var check = sessionStorage.getItem('name');
        $('#yellow').html(check);

      }) // end of onSelect
    }); // end of .datekpicker()

}); // end of ready
