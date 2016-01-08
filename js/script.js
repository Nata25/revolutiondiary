// Document.ready()

$(function() {

// *********************
// DATE BLOCK
// *********************

// Helper to convert numeric months into string
function numToMonth(num) {
  if (num == 11) {
    return "листопада";
  }
  else if (num == 12) {
    return "грудня";
  }
  else if (num == 1){
    return "січня";
  }
  else {
    return "лютого";
  }
}

var currentURL = window.location.pathname;

if (currentURL.slice(-10, -5) !== "index") {
  var day = currentURL.slice(-15, -13);
  var num_month = currentURL.slice(-12, -10);
  var month = numToMonth(num_month);
  $(".day").html(day);
  $(".month").html(month);
}

// *********************
// DATEPICKER
// *********************

  // initialize datepicker

$("#datepicker").datepicker(
    {
      dateFormat: "d MM m",
      monthNames: ["січня", "лютого", "березня", "квітня", "червня", "травня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"],
      defaultDate: new Date(2013, 10, 21),
      minDate: new Date(2013, 10, 21),
      maxDate: new Date(2014, 2, 22),

      // get a date from datepicker:

      onSelect: (function (dateText) {
        var dateString = dateText.split(" ");
        var day = dateString[0];
        var month = dateString[1];
        var numMonth = dateString[2];
        var dateInNums = dateString[0] + dateString[2];

    //    d = $.datepicker.parseDate("dm", dateInNums);

      // change link on go-button according to the selected date
        var newURL = "file://localhost/Users/yuriybesarab/Git/Days/dates/11/d" + day + "-" + numMonth + "-2015.html";
        $(".link-to-page").attr('href', newURL);

        // update date-block fields on click
        $(".day").html(day);
        $(".month").html(month);

        // update currentDate in sessionStorage

        // ********

      }) // end of onSelect

    }); // end of .datepicker()


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
