// Document.ready()
$(function() {

  // ******************
  // Global variables used in accessibility section
  // *****************

  // var prev = ".ui-datepicker-prev";
  // var next = ".ui-datepicker-next";
  var beginning = "листопада";
  var end = "березня";


  // ******************
  // SESSION STORAGE
  // *****************
  // The ref to sessionStorage is needed for preserve current date when going from
  // inner page to home page. Otherwise, Nov 21 would be highlighted constantly.

   //sessionStorage.removeItem("currentDate"); // uncomment to clean storage

  // In the Storage, save one variable which consists of slices to generate strings
  // for a) links, b) date-block fields, and for c) DP, which is initiated in dd MM (M) yy format

  if (!(sessionStorage.getItem("currentDate"))) {
    sessionStorage.setItem("currentDate", "21 листопада (Nov) 2013");
  }

  // ******************
  // GLOBAL VARIABLES
  // *****************

  var domain = "localhost:8888";

  var monthsNames = ["січня", "лютого", "березня", "квітня", "червня", "травня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
  var dayNames = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];

// ******************
// HELPER FUNCTIONS
// ******************

// Update datepicker and date-block; date is Date() or a str in `dd MM (M) yy` format; day = dd, month = MM
function upd_DP(date, day, month) {
  $("#datepicker").datepicker("setDate", date);
  $(".day").html(day);
  $(".month").html(month);
}

// Update sessionStorage from Date()
function upd_storage(date) {
  var formattedDate = $.datepicker.formatDate("dd MM (M) yy", date, {
    monthNames: monthsNames
  });
  sessionStorage.setItem("currentDate", formattedDate);
  console.log("sessionStorage is updated, new value is: " + formattedDate);
}

// Generate URL based on string slices
function newURL(d, m, y) { return  "/" + y + "/" + m + "/" + d };


// Change date() for +1 month
Date.isLeapYear = function (year) {
    return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
};
Date.getDaysInMonth = function (year, month) {
    return [31, (Date.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
};
Date.prototype.isLeapYear = function () {
    return Date.isLeapYear(this.getFullYear());
};
Date.prototype.getDaysInMonth = function () {
    return Date.getDaysInMonth(this.getFullYear(), this.getMonth());
};
Date.prototype.addMonths = function (value) {
    var n = this.getDate();
    this.setDate(1);
    this.setMonth(this.getMonth() + value);
    this.setDate(Math.min(n, this.getDaysInMonth()));
    return this;
};

// ***********************************
//***** DATEPICKER *****//
// ***********************************

//*** Initialize datepicker. Set dates range, date format.

$("#datepicker").datepicker(
    {
      dateFormat: "dd MM (M) yy",
      minDate: new Date(2013, 10, 21),
      maxDate: new Date(2014, 2, 22),
      monthNames: monthsNames,
      dayNamesMin: dayNames,
      firstDay: 1,
      onSelect: (function (dateText) {
        var dateString = dateText.split(" ");
        var day = dateString[0];
        var month = dateString[1];
        var shortMonth = dateString[2].slice(1, -1);
        var year = dateString[3];
        //*** Load new page corresponding to the date
        var lnk = newURL(day, shortMonth, year);
        window.location = lnk;
      }) // end of onSelect
    }); // end of .datepicker() initialization

//***  Based on current URL, set:
//  *   - dates into the input fields
//  *   - current date in datepicker
//  *   - link on button, next, prev (if needed)

    var currentURL = window.location.pathname;
    var regex = new RegExp("[201]");

  //For home page (get current date from storage)
    if (!regex.test(currentURL)) {
      var date = sessionStorage.getItem("currentDate");
      // convert to array of dd MM (mm) yy
      var splitted = date.split(" ");
      var day = splitted[0];
      var month = splitted[1];
      var shortMonth = splitted[2].slice(1, -1);
      var year = splitted[3];
      upd_DP(date, day, month);
      $(".link-to-page").attr('href', newURL(day, shortMonth, year));
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
        monthNames: monthsNames
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
      $(".prev").attr("href", newURL(prevDateLST[0], prevDateLST[1], prevDateLST[2]));
      $(".next").attr("href", newURL(nextDateLST[0], nextDateLST[1], nextDateLST[2])); // both go-button on top and 'Next' link on the bottom are affected
      // set links to the home page (logo and 'Home' on the bottom)
      $(".home").attr("href", "/");
    }

//***  ACCESSIBLITY: allow to choose a date with Tab and Enter key


// Declare the function to be fired on 'prev` or `next` buttons
function tabulation(id, edge, step) {
    // style the button
    $(id).addClass("ui-state-active");
    arrowLeft();
    // bind Enter key event to the button
    $(id).keydown(function(evt) {
      if (evt.which == 13 && $(".month").html() != edge) {
        changeMonth(step)

        // Keep `next` button active
        $(id).attr("tabindex", "2");
        $(id).focus();

        // Let the button be the next element to come into focus to choose current date
        $(".link-to-page").attr("tabindex", "3");

        // Bind Enter key event again as we've changed the month
        tabulation(id, edge, step);
        // Manage state of 'next' button after it come out of focus
        out_of_focus(id);

        // Bind tabulation to the days of the next month
        selectDay("table.ui-datepicker-calendar a");
      }
  });
}

// Add or substract a month on each Enter press depending on step
  function changeMonth(step) {
    // Get current date and modify it
    var current = $("#datepicker").datepicker("getDate");
    var change_month = current.addMonths(step);
    // Attach link to go-button
    var format_for_link = $.datepicker.formatDate("yy/M/dd", change_month, {
      monthNames: monthsNames
    });
    var link = "/" + format_for_link;
    $(".link-to-page").attr("href", link);
    // Update DP
    var format_for_date_block = $.datepicker.formatDate("dd MM", change_month, {
      monthNames: monthsNames
    });
    var dateToWords = format_for_date_block.split(" ");
    upd_DP(change_month, dateToWords[0], dateToWords[1]);
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

      function arrowLeft() {
        $(".ui-datepicker-next").keydown(function(evt) {
          if (evt.which == 37) {
            console.log("inside arrowLeft()");
            $(".ui-datepicker-prev").focus();
            out_of_focus(".ui-datepicker-next");
            tabulation(".ui-datepicker-prev", beginning, -1);
          }
        });
      }

      function arrowRight() {
        $(".ui-datepicker-prev").keydown(function(evt) {
          if (evt.which == 39) {
            console.log("inside arrowRight");
            $(".ui-datepicker-next").focus();
            out_of_focus(".ui-datepicker-prev");
            tabulation(".ui-datepicker-next", end, 1);
          }
        });
      }


      $(".ui-datepicker-prev").attr("tabindex", "1");
      $(".ui-datepicker-prev").focus(function() {
        tabulation(".ui-datepicker-prev", "листопада", -1);
      });

      out_of_focus(".ui-datepicker-prev");

      $(".ui-datepicker-next").attr("tabindex", "1");
      $(".ui-datepicker-next").focus(function() {
        tabulation(".ui-datepicker-next", "березня", 1);
      });

      out_of_focus(".ui-datepicker-next");

      // Bind tabulation to the days of the current month
      selectDay("table.ui-datepicker-calendar a");

      // Manage left/right arrow key to jump between 'next' and 'prev' buttons

      $(".ui-datepicker-next").focus(function() {
        console.log("initial");
        arrowLeft(".ui-datepicker-next");
      })

// EXTEND (KEYBOARD ACCESSIBLITY)

$.extend($.datepicker, {
     _doKeyDown: function(event){
           //copy original source here with different
           //values and conditions in the switch statement

           var keyCode = event.which;
            if(keyCode == 9) // if tab was pressed, use pressed key for calendar control
            {
                event.preventDefault();
                event.stopPropagation();
                console.log("event?");

                var parts = $("#datepicker").val().split("/");
                var currentDate = new Date(parts[2], parts[0]-1, parts[1]); // months are 0-based

                switch(keyCode)
                {
                    case 37: // LEFT, -1 day
                        currentDate.setDate(currentDate.getDate() -1);
                        break;
                    case 38: // UP, -1 week
                        currentDate.setDate(currentDate.getDate() -7);
                        break;
                    case 39: // RIGHT, +1 day
                        currentDate.setDate(currentDate.getDate() +1);
                        break;
                    case 40: // DOWN, +1 week
                        currentDate.setDate(currentDate.getDate() +7);
                        break;
                }

                $("#datepicker").html( currentDate.toString() );
                if(currentDate != null)
                {
                    $("#datepicker").datepicker("setDate", currentDate);
                }
            }
     }
});


}); // end of ready
