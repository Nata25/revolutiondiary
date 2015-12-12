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

      }) // end of onSelect
    }); // end of .datekpicker()

}); // end of ready
