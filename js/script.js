// Document.ready()

// sessionStorage.removeItem("currentDate"); // uncomment to clean storage

if (!(sessionStorage.getItem("currentDate"))) {
  sessionStorage.setItem("currentDate", "21 листопада (11) 2013");
}

console.log(window.innerWidth);
console.log(window.innerHeight);

$(function() {

// *********************
// DATEPICKER
// *********************

//*** Initialize datepicker. Set dates range, date format.

$("#datepicker").datepicker(
    {
      dateFormat: "d MM (mm) yy",
      minDate: new Date(2013, 10, 21),
      maxDate: new Date(2014, 2, 22),
      monthNames: ["січня", "лютого", "березня", "квітня", "червня", "травня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],

//*** Get a date from datepicker:
      onSelect: (function (dateText) {
        var dateString = dateText.split(" ");
        var day = dateString[0];
        var month = dateString[1];
        var numMonth = dateString[2].slice(1, 3);
        console.log(numMonth);
        var dateInNums = dateString[0] + dateString[2];

//*** Store selected date in storage to grab it on return to index.html:
        sessionStorage.setItem("currentDate", dateText);
        console.log("inside select: " + sessionStorage.getItem("currentDate"));

//*** Change link on go-button according to the selected date
        var newURL = "file://localhost/Users/yuriybesarab/Git/Days/dates/11/d" + day + "-" + numMonth + "-2013.html";
        $(".link-to-page").attr('href', newURL);

//*** Update date-block fields on click
        $(".day").html(day);
        $(".month").html(month);

      }) // end of onSelect

    }); // end of .datepicker() initialization

//***  Set dates into the input fields.
//***  Set the current date.

    console.log("outside select: " + sessionStorage.getItem("currentDate"));

    var currentURL = window.location.pathname;

  //For inner pages:
    if (currentURL.slice(-10, -5) !== "index") {
      var stringDate = currentURL.slice(-15, -5);
      var dateDate = $.datepicker.parseDate("dd-mm-yy", stringDate);
      $("#datepicker").datepicker("setDate", dateDate);
      var formattedDate = $.datepicker.formatDate("dd MM", dateDate, {
        monthNames: ["січня", "лютого", "березня", "квітня", "червня", "травня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"]
      });
      var dateToWords = formattedDate.split(" ");
      console.log(formattedDate);
      $(".day").html(dateToWords[0]);
      $(".month").html(dateToWords[1]);
    }
  //For home page
    else {
      $("#datepicker").datepicker("setDate", sessionStorage.getItem("currentDate"));
      var dateStored = sessionStorage.getItem("currentDate").split(" ");
      $(".day").html(dateStored[0]);
      $(".month").html(dateStored[1]);
    }


// *****************************
// HOVER ITEMS IN SELECTED BLOCK
// *****************************

    $(".control-hover").hover(
      function() {
        $(this).find('p')
          .removeClass('mid-transparent')
          .addClass('increase-fontSize');

        $(this).children('.red-square').css('background-color', '#b36665');

        $(this).find('.ellipsis')
                  .css('color', '#715139')
                  .addClass('increase-fontSize');
                },

      function() {
        $(this).find('p').addClass('mid-transparent');
        $(this).find('p').removeClass('increase-fontSize');
        $(this).children('.red-square').css('background-color', '#f5f7fb');

        $(this).find('.ellipsis').css('color', '#bda492')
                  .removeClass('increase-fontSize');
      }
    ); // end of hover on a line

    // HOVER ON SINGE ITEM

    $('.hover-sheet').hover(
      function() {

        $(this).find('.ellipsis').css(
          {
            'backgroundColor': '#dcd9d4',
            'box-shadow': '-10px 0px 20px #dcd9d4',
          });
      },
      function() {
        $(this).find('.ellipsis').css(
          {
            'backgroundColor': '#f5f7fb',
            'box-shadow': '-10px 0px 20px #f5f7fb'
          });

      } // end of second hover argument
    ); // end of hover on item


// **************************
// FADE ON VISIBLE ITEMS
// **************************

  var win = $(window);
  var allItems = $(".control-hover");

  // Already visible items
  allItems.each(function(e, el) {
    var el = $(el);
    if (el.visible(true)) {
      el.addClass('already-visible');
    }
  });

  // Fade and move up visible items on initial scrolling

    win.scroll(function() {
      allItems.each(function (i, el) {
        var el = $(el);
        if (el.visible(true)) {
          el.addClass('come-in');
        }
      }); // end of each
    }); // end of scroll


// **************************
// SCROLL EFFECT ON DATE BLOCK (INNER PAGES)
// **************************

    $(window).scroll(function () {
      if ($(this).scrollTop() > 20) {
        $('.fixed').children('.day, .month').css('backgroundColor', 'white');
      }

      else {
        $('.fixed').children('.day, .month').css('backgroundColor', '#f4f6ec');
      }
    }); // end of scroll



}); // end of ready
