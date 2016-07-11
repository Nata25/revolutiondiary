// Document.ready()
$(function() {

  // ******************
  // Global variables
  // *****************
   var myDatepicker = $("#datepicker");
   var dayField = $(".day");
   var monthField = $(".month");
   var minDate = new Date(2013, 10, 21);
   var maxDate = new Date(2014, 2, 22);
   var beginning = "листопада";
   var end = "лютого";
   var linkToPage = $(".link-to-page");
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
  myDatepicker.datepicker("setDate", date);
  dayField.html(day);
  monthField.html(month);
}

// Update sessionStorage from Date()
function upd_storage(date) {
  var formattedDate = $.datepicker.formatDate("dd M yy", date, {
    monthNames: monthsNames
  });
  sessionStorage.setItem("currentDate", formattedDate);
}

// Generate URL based on string slices
function newURL(d, m, y) { return  "/" + y + "/" + m + "/" + d };

// ***********************************
//***** DATEPICKER *****//
// ***********************************

//*** Initialize datepicker. Set dates range, date format.

myDatepicker.datepicker(
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
      }), // end of onSelect
      onChangeMonthYear: (function (year, month, inst) {
        setTimeout(function() {
          selectMonth();
          clickExtended();
          selectDay();
        }, 10);
      })

    }); // end of .datepicker() initialization

//***  Based on current URL, update datepicker and link on button

    var currentURL = window.location.pathname;
    var regex = new RegExp("[201]");

  //If on the home page (get current date from storage):
    if (!regex.test(currentURL)) {

      var stringDate = sessionStorage.getItem("currentDate");
      var splitted = stringDate.split(" ");
      var day = splitted[0];
      var shortMonth = splitted[1];
      var year = splitted[2];
      linkToPage.attr('href', newURL(day, shortMonth, year));
      linkToPage.attr("accesskey", "g");
      var dateDate = $.datepicker.parseDate("dd M yy", stringDate);
      var month = $.datepicker.formatDate("MM", dateDate, {
        monthNames: monthsNamesAffixes
      });
      upd_DP(dateDate, day, month);
    }

  // If on inner pages (get current date from URL)
    else {
      var stringDate = currentURL.slice(-11);
      // Convert to new Date()
      var dateDate = $.datepicker.parseDate("yy/M/dd", stringDate);
      // Store selected date in storage to grab it on return to index.html:
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
    }


// KEYBOARD ACCESSIBLITY

// Fires on prev / next buttons
function selectMonth() {
  tab(".ui-datepicker-prev", -1);
  tab(".ui-datepicker-next", 1);
}

// Helper for selectMonth()
function tab(id, step) {
  var obj = $(id);
  // Check if next/prev month selection is available
  if (!(obj.hasClass("ui-state-disabled"))) {
    obj.attr("tabindex", "1");
    into_focus(obj);
    out_of_focus(obj);
    // Bind Enter key event to the button
    obj.keydown(function(evt) {
      if (evt.which == 13) {
        changeMonth(step);
        // Re-define next/prev objecs as html changed after mouse press
        obj = $(id);
        // Keep the button active
        into_focus(obj);
        obj.attr("tabindex", "2");
        obj.focus();
        // Bind arrowp ress to the buttons
        arrow();
      }
  });
 }
}

// Month change: skip to the 1st day of the next/prev month
  function changeMonth(step) {
    // Get current date and modify it
    var current = myDatepicker.datepicker("getDate");
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

// Highligt button in focus
    function into_focus(id) {
      id.focus(function() {
        if (!($(this).hasClass("ui-state-disabled"))) {
          $(this).addClass("ui-state-hover");
        }
      });
    }
// Remove highlighting if out of focus
    function out_of_focus(id) {
      $(id).blur(function() {
        if (!($(this).hasClass("ui-state-disabled"))) {
          $(this).removeClass("ui-state-hover");
      }
      });
    }

// Tabulation on days td cells
    function selectDay() {
      // Move focus to the first available day
        var cell = $(".ui-state-default");
        var td = cell.parent().not(".ui-state-disabled");
        var active_cell = td.children("a");
        active_cell.attr("tabindex", "3");
        // Highlight day in focus as tab moves along
        active_cell.focus(function() {
          var day = $(this).html();
          $(".ui-state-active").removeClass("ui-state-active");
          $(this).addClass("ui-state-active");
        });
      }

// Bind left/right arrow press events
      function arrow() {
        var nextMonth = $(".ui-datepicker-next");
        var prevMonth = $(".ui-datepicker-prev");
        attachArrow(nextMonth, prevMonth, 37); // right arrow
        attachArrow(prevMonth, nextMonth, 39); // left arrow
      }
// helper for arrow()
      function attachArrow(obj, opposite, key) {
        obj.keydown(function(evt) {
          if (evt.which == key) {
            opposite.attr("tabindex", "1");
            opposite.focus();
            out_of_focus(obj);
          }});
      }

// CHANGE DATEPICKER FIELDS CONTENT ON CLICK NEXT/PREV MONTH
      function clickExtended() {
        prevMonth = $(".ui-datepicker-prev");
        nextMonth = $(".ui-datepicker-next");
        if (!(prevMonth.hasClass("ui-state-disabled"))) {
            prevMonth.click(function() {
              changeMonth(-1);
            });
        }
        if (!(nextMonth.hasClass("ui-state-disabled"))) {
            nextMonth.click(function() {
              changeMonth(1);
            });
        }
      }

}); // end of ready
