// Document.ready()
$(function() {

  // ******************
  // Global variables used in accessibility section
  // *****************
   var minDate = new Date(2013, 10, 21);
   var maxDate = new Date(2014, 2, 22);
   var beginning = "листопада";
   var end = "березня";
   var linkToPrev = $(".prev");
   var linkToNext = $(".next");

  // ******************
  // SESSION STORAGE
  // *****************
  // The ref to sessionStorage is needed for preserve current date when going from
  // inner page to home page. Otherwise, Nov 21 would be highlighted constantly.

   //sessionStorage.removeItem("currentDate"); // uncomment to clean storage

  // In the Storage, save one variable which consists of slices to generate strings
  // for a) links, b) date-block fields, and for c) DP, which is initiated in dd MM (M) yy format

  if (!(sessionStorage.getItem("currentDate"))) {
    sessionStorage.setItem("currentDate", "21 Nov 2013");
  }

  // ******************
  // GLOBAL VARIABLES
  // *****************

  var domain = "localhost:8888";

  var monthsNamesAffixes = ["січня", "лютого", "березня", "квітня", "червня", "травня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
  var monthsNames = ["січень", "лютий", "березень", "квітень", "червень", "травень", "липень", "серпень", "вересень", "жовтень", "листопад", "грудень"];
  var dayNames = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

// ******************
// HELPER FUNCTIONS
// ******************

// Update datepicker and date-block; date is Date() or a str in `dd MM (M) yy` format
function upd_DP(date, day, month) {
  $("#datepicker").datepicker("setDate", date);
  $(".day").html(day);
  $(".month").html(month);
}

// Update sessionStorage from Date()
function upd_storage(date) {
  var formattedDate = $.datepicker.formatDate("dd M yy", date, {
    monthNames: monthsNames
  });
  sessionStorage.setItem("currentDate", formattedDate);
  console.log("sessionStorage is updated, new value is: " + formattedDate);
}

// Generate URL based on string slices
function newURL(d, m, y) { return  "/" + y + "/" + m + "/" + d };

// ***********************************
//***** DATEPICKER *****//
// ***********************************

//*** Initialize datepicker. Set dates range, date format.

$("#datepicker").datepicker(
    {
      dateFormat: "dd M yy",
      minDate: minDate,
      maxDate: maxDate,
      monthNames: monthsNames,
      dayNamesMin: dayNames,
      firstDay: 1,
      onSelect: (function (dateText) {
        var dateString = dateText.split(" ");
        var day = dateString[0];
        var shortMonth = dateString[1];
        var year = dateString[2];
        //*** Load new page corresponding to the date
        var lnk = newURL(day, shortMonth, year);
        window.location = lnk;
      }) // end of onSelect
    }); // end of .datepicker() initialization

    var linkToPage = $(".link-to-page");

//***  Based on current URL, set:
//  *   - dates into the input fields
//  *   - current date in datepicker
//  *   - link on button, next, prev (if needed)

    var currentURL = window.location.pathname;
    var regex = new RegExp("[201]");

  //For home page (get current date from storage)
    if (!regex.test(currentURL)) {

      var stringDate = sessionStorage.getItem("currentDate");
      console.log("from storage: " + stringDate);
      //var dateDate = $.datepicker.parseDate("dd MM (M) yy", date);
      //console.log(dateDate);
      //convert to array of dd MM (mm) yy
      var splitted = stringDate.split(" ");
      var day = splitted[0];
      var shortMonth = splitted[1];
      var year = splitted[2];
      linkToPage.attr('href', newURL(day, shortMonth, year));
      var dateDate = $.datepicker.parseDate("dd M yy", stringDate);
      console.log(dateDate);
      var month = $.datepicker.formatDate("MM", dateDate, {
        monthNames: monthsNamesAffixes
      });
      upd_DP(dateDate, day, month);

    }

  //For inner pages (get current date from URL)
    else {
      var stringDate = currentURL.slice(-11);
      // convert to new Date()
      var dateDate = $.datepicker.parseDate("yy/M/dd", stringDate);
      //*** Store selected date in storage to grab it on return to index.html:
      upd_storage(dateDate);
      var dateToNums = stringDate.split("/");
      var day = dateToNums[2];
      var month = $.datepicker.formatDate("MM", dateDate, {
        monthNames: monthsNamesAffixes
      });
      var shortMonth = dateToNums[1];
      var year = dateToNums[0];
      upd_DP(dateDate, day, month);

      // Calculate prev/next day
      var next = new Date(dateDate);
      var prev = new Date(dateDate);
      prev.setDate(prev.getDate() - 1);
      next.setDate(next.getDate() + 1);
      var prevDateLST = $.datepicker.formatDate("dd M yy", prev).split(" ");
      var nextDateLST = $.datepicker.formatDate("dd M yy", next).split(" ");
      linkToPrev.attr("href", newURL(prevDateLST[0], prevDateLST[1], prevDateLST[2]));
      linkToNext.attr("href", newURL(nextDateLST[0], nextDateLST[1], nextDateLST[2])); // both go-button on top and 'Next' link on the bottom are affected
      // set links to the home page (logo and 'Home' on the bottom)
      $(".home").attr("href", "/");
    }


//***  ACCESSIBLITY *** //
//     allow to choose a date with a keyboard

// Declare the function to be fired on 'prev` or `next` buttons
function tabulation(id, edge, step) {
    var obj = $(id);
    into_focus(obj);
    out_of_focus(id);

    // bind Enter key event to the button
    obj.keydown(function(evt) {

      if (evt.which == 13 && $(".month").html() != edge) {
        // Changing month
        changeMonth(step);

        // Re-define next/prev objecs as html changed after mouse press
        obj = $(id);

        // Keep the button active
        into_focus(obj);
        obj.attr("tabindex", "2");
        obj.focus();

        // Bind arrow event to the buttons
        arrow();

        // Re-bind Enter key event after month change
        tabulation(".ui-datepicker-prev", beginning, -1);
        tabulation(".ui-datepicker-next", end, 1);

        // Let the go-button be the next element to come into focus to choose current date
        linkToPage.attr("tabindex", "3");

        // Bind tabulation to the days of the next month
        selectDay("table.ui-datepicker-calendar a");
      }
  });
}

// Manage month change: skip to the 1st day of the next/prev month
  function changeMonth(step) {
    // Get current date and modify it
    var current = $("#datepicker").datepicker("getDate");
    var monthNum = current.getMonth() + step;
    current.setMonth(monthNum);
    current.setDate(1);

    // Update DP
    var format_for_date_block = $.datepicker.formatDate("d MM", current, {
      monthNames: monthsNamesAffixes
    });
    var dateToWords = format_for_date_block.split(" ");
    var month = dateToWords[1];
    if (month != beginning) {
        upd_DP(current, dateToWords[0], dateToWords[1]);
    }
    else {
        upd_DP(minDate, minDate.getDate(), dateToWords[1]);
        current = minDate;
    }
    // Attach link to go-button
    var format_for_link = $.datepicker.formatDate("yy/M/dd", current);
    var link = "/" + format_for_link;
    linkToPage.attr("href", link);
  }

    function into_focus(id) {
      id.focus(function() {
        $(this).addClass("ui-state-active");
      });
    }

    function out_of_focus(id) {
      $(id).blur(function() {
        $(this).removeClass("ui-state-active");
      });
    }

    function selectDay(elem) {
        $(elem).focus(function() {
          var day = $(this).html();
          $(".ui-state-active").removeClass("ui-state-active");
          $(this).addClass("ui-state-active");
          $(".day").html(day);
        });
      }


      function arrow() {
        var nextMonth = $(".ui-datepicker-next");
        var prevMonth = $(".ui-datepicker-prev");
        // Left arrow key
        nextMonth.keydown(function(evt) {
          if (evt.which == 37) {
            prevMonth.attr("tabindex", "1");
            prevMonth.focus();
            out_of_focus(".ui-datepicker-next");
          }});
          // Right arrow key
          prevMonth.keydown(function(evt) {
            if (evt.which == 39) {
              nextMonth.attr("tabindex", "1");
              nextMonth.focus();
              out_of_focus(".ui-datepicker-prev");
            }});
      }

      // SET INITIAL EVENT BINDING
      // Prev / Next buttons Objects
      var prevMonth = $(".ui-datepicker-prev");
      var nextMonth = $(".ui-datepicker-next");

      prevMonth.attr("tabindex", "1");
      tabulation(".ui-datepicker-prev", beginning, -1);

      nextMonth.attr("tabindex", "1");
      tabulation(".ui-datepicker-next", end, 1);

      // Bind tabulation to the days of the current month
      selectDay("table.ui-datepicker-calendar a");

      // Manage left/right arrow key to jump between 'next' and 'prev' buttons
      arrow();

      // HIGHLIGHT DATES ON CLICK
      function clickExtended() {
        prevMonth = $(".ui-datepicker-prev");
        nextMonth = $(".ui-datepicker-next");
        prevMonth.click(function() {
          changeMonth(-1);
          clickExtended();
        });
        nextMonth.click(function() {
          changeMonth(1);
          clickExtended();
        });
      }
      clickExtended();

}); // end of ready
