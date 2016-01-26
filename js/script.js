// Document.ready()

// sessionStorage.removeItem("currentDate"); // uncomment to clean storage

if (!(sessionStorage.getItem("currentDate"))) {
  sessionStorage.setItem("currentDate", "21 листопада (11) 2013");
}

//console.log(window.innerWidth);
//console.log(window.innerHeight);

$(function() {

// *********************
// DATEPICKER
// *********************

var monthsNames = ["січня", "лютого", "березня", "квітня", "червня", "травня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
function newURL(d, m, y) {
  return "file://localhost/Users/yuriybesarab/Git/Days/page" + d + "-" + m + "-" + y + ".html" };
//*** Initialize datepicker. Set dates range, date format.

$("#datepicker").datepicker(
    {
      dateFormat: "d MM (mm) yy",
      minDate: new Date(2013, 10, 21),
      maxDate: new Date(2014, 2, 22),
      monthNames: monthsNames,

//*** Get a date from datepicker:
      onSelect: (function (dateText) {
        var dateString = dateText.split(" ");
        var day = dateString[0];
        var month = dateString[1];
        var numMonth = dateString[2].slice(1, 3);
        var dateInNums = dateString[0] + dateString[2];
        var year = dateString[3];

//*** Store selected date in storage to grab it on return to index.html:
        sessionStorage.setItem("currentDate", dateText);

//*** Change link on go-button according to the selected date
        $(".link-to-page").attr('href', newURL(day, numMonth, year));

//*** Update date-block fields on click
        $(".day").html(day);
        $(".month").html(month);

      }) // end of onSelect

    }); // end of .datepicker() initialization

//***  Based on current URL, set:
//***   - dates into the input fields
//***   - current date in datepicker
//***   - initial link on the go-button

    var currentURL = window.location.pathname;

  //For home page:
    if (currentURL.slice(-10, -5) == "index") {
      $("#datepicker").datepicker("setDate", sessionStorage.getItem("currentDate")); // get date from STORAGE and highlight it
      var dateStored = sessionStorage.getItem("currentDate").split(" ");             // convert to array of dd MM (mm) yy
      var day = dateStored[0];
      $(".day").html(day);                                                          // fill datepicker-fields
      $(".month").html(dateStored[1]);                                              // fill datepicker-fields
      var numMonth = dateStored[2].slice(1, 3);
      var year = dateStored[3];
      $(".link-to-page").attr('href', newURL(day, numMonth, year));
    }
  //For inner pages
    else {
      var stringDate = currentURL.slice(-15, -5);                                    // get string with date from URL
      var dateDate = $.datepicker.parseDate("dd-mm-yy", stringDate);                 // convert to new Date
      sessionStorage.setItem("date", dateDate);
      $("#datepicker").datepicker("setDate", dateDate);                              // highlight this Date as current
      var dateToNums = stringDate.split("-");                                        // get numbers for dd, mm, yy
      var day = dateToNums[0];
      var numMonth = dateToNums[1];
      var year = dateToNums[2];
      $(".link-to-page").attr('href', newURL(day, numMonth, year));                  // change link on a button
      var formattedDate = $.datepicker.formatDate("dd MM", dateDate, {
        monthNames: monthsNames
      });                                                                            // get string (word) equivalent for numMonth:
      var dateToWords = formattedDate.split(" ");
      var month = dateToWords[1];
      $(".day").html(day);                                                           // fill datepicker-fields
      $(".month").html(month);                                                       // fill datepicker-fields
      var newDateStored = day + " " + month + " (" + numMonth + ") " + year;
      sessionStorage.setItem("currentDate", newDateStored);                          // set var in sessionStorage
    }

    // Calculate prev/next day
    var currentDate = sessionStorage.getItem("date");
    var next = new Date(currentDate);
    var prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    next.setDate(next.getDate() + 1);
    var prevDateLST = $.datepicker.formatDate("dd mm yy", prev).split(" ");
    var nextDateLST = $.datepicker.formatDate("dd mm yy", next).split(" ");
    $("#prev").attr("href", newURL(prevDateLST[0], prevDateLST[1], prevDateLST[2]));
    $("#next").attr("href", newURL(nextDateLST[0], nextDateLST[1], nextDateLST[2]));
    

// *****************************
// CALCULATE HEIGHT OF HERO AREA
// (not for mobile and Kindle)
// *****************************

  var initHeight = window.innerHeight - 115;
  //console.log(hght);
  var initWidth = window.innerWidth;
  var ratio = window.innerHeight / initWidth;
  if (initWidth > 800 && (initWidth < 1900 && ratio < 1)) {
    $('.hero').css("height", initHeight);
  }

/*** STICK SIDEBAR to the left (Kindle) ****/
  function findLeftMargin(wdth) { return (wdth - 1900) / 2 }

  if (initWidth > 2140) {
    $('.absolute').css("left", findLeftMargin(initWidth));
  }
  $(window).resize(function() {
    var resizedWidth = window.innerWidth;
    if (resizedWidth > 2140) {
      var left = findLeftMargin(resizedWidth);
      console.log(left);
      $('.absolute').css("left", left);
   }
 /*** revert auto height if the page is resized to mobile version ***/
     if (resizedWidth < 800) {
       $('.hero').css("height", "550px");
     }
 });

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

  function normalizeDates() {
    $('.date-block').find('#button').css('border-color', 'white');
    $('.date-block').children('.day, .month').css('color', '#4a5894');
  }
  function whiteDates() {
    $('.date-block').find('#button').css('border-color', '#B69494');
    $('.date-block').children('.day, .month').css('color', 'white');
  }

  // Perform on widescreens only (the rest is handled by css)


  var mql = window.matchMedia("screen and (min-width: 1400px)");
  styleDateBlock(mql);
  mql.addListener(styleDateBlock);

  function styleDateBlock(mql) {
    if (mql.matches) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
          normalizeDates();
        }
        else {
          whiteDates();
        }
      console.log('scroling');
      }); // end of scroll
      $('.title-date').children("h1").addClass("grey");
      $('.datepicker-fields.absolute').addClass("light");
    } // end of if statement
    else {
      $('.title-date').children("h1").removeClass("grey");
      $('.datepicker-fields.absolute').removeClass("light");
    }
  } // end of function

/*    $(window).resize(function() {
      if (window.innerWidth <= 1400) {
        normalizeDates();
      }
      else {
        whiteDates();
        console.log("inside whitenDates()")
      }
    }); // end of resize */

// **************************
// INNER PAGES, mobile devices
// **************************
    if (window.innerWidth >= 800) {
      $(".logo").hoverIntent(
        function() {
          $(this).prev(".home-slide").removeClass("slide-up").addClass("slide-down");
        },
        function() {
          $(this).prev(".home-slide").removeClass("slide-down").addClass("slide-up");
        }
      ); // end of hover

      $(window).resize(function () {
        $(".home-slide").removeClass("slide-up");
      });
  } // end of if statement


}); // end of ready
