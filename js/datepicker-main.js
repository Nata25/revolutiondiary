// Document.ready()

$(function() {

//sessionStorage.removeItem('dayStored');
//sessionStorage.removeItem('monthStored');

console.log(sessionStorage.getItem('dayStored'));
console.log(sessionStorage.getItem('monthStored'));

if (!sessionStorage.dayStored) {
    sessionStorage.setItem('dayStored', $("#date").html() );
    console.log(sessionStorage.dayStored);
}

if (!sessionStorage.monthStored) {
    sessionStorage.setItem('monthStored', $("#month").html() );
    console.log(sessionStorage.monthStored);
}

  // initialize datepicker

  console.log(sessionStorage.getItem('dayStored'));
  console.log(sessionStorage.getItem('monthStored'));

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


        sessionStorage.setItem('dayStored', day);
        sessionStorage.setItem('monthStored', month);
        console.log(sessionStorage.getItem('dayStored'));
        console.log(sessionStorage.getItem('monthStored'));

      }) // end of onSelect

      console.log(sessionStorage.getItem('dayStored'));
      console.log(sessionStorage.getItem('monthStored'));

      $("#date").html(sessionStorage.getItem('dayStored'));
      $("#month").html(sessionStorage.getItem('monthStored'));



    }); // end of .datekpicker()

}); // end of ready
