// Helper to change month with tabulation
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

// sessionStorage.removeItem("currentDate"); // uncomment to clean storage
// sessionStorage.removeItem("date"); // uncomment to clean storage

if (!(sessionStorage.getItem("currentDate"))) {
  sessionStorage.setItem("currentDate", "21 листопада (Nov) 2013");
}

//console.log(window.innerWidth);
//console.log(window.innerHeight);

var domain = "localhost:8888";

// Document.ready()
$(function() {

// ***********************************
//***** DATEPICKER *****//
// ***********************************

var monthsNames = ["січня", "лютого", "березня", "квітня", "червня", "травня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"];
var dayNames = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
function newURL(d, m, y) {
  return  "/" + y + "/" + m + "/" + d };
//*** Initialize datepicker. Set dates range, date format.

$("#datepicker").datepicker(
    {
      dateFormat: "dd MM (M) yy",
      minDate: new Date(2013, 10, 21),
      maxDate: new Date(2014, 2, 22),
      monthNames: monthsNames,
      dayNamesMin: dayNames,
      firstDay: 1,

//*** Get a date from datepicker:
      onSelect: (function (dateText) {
        var dateString = dateText.split(" ");
        var day = dateString[0];
        var month = dateString[1];
        var shortMonth = dateString[2].slice(1, -1);
    //    var dateInNums = dateString[0] + dateString[2];
        var year = dateString[3];

//*** Store selected date in storage to grab it on return to index.html:
        sessionStorage.setItem("currentDate", dateText);

//*** Load new page corresponding to the date
        var lnk = newURL(day, shortMonth, year);
        window.location = lnk;

      }) // end of onSelect

    }); // end of .datepicker() initialization

//***  Based on current URL, set:
//  *   - dates into the input fields
//  *   - current date in datepicker

    var currentURL = window.location.pathname;
    console.log(currentURL);

  //For home page:
    var regex = new RegExp("[201]");
    if (!regex.test(currentURL)) {
      console.log("I'm on a home page!")
      $("#datepicker").datepicker("setDate", sessionStorage.getItem("currentDate")); // get date from STORAGE and highlight it
      var dateStored = sessionStorage.getItem("currentDate").split(" ");             // convert to array of dd MM (mm) yy
      var day = dateStored[0];
      $(".day").html(day);                                                          // fill datepicker-fields
      $(".month").html(dateStored[1]);                                              // fill datepicker-fields
      var shortMonth = dateStored[2].slice(1, -1);
      var year = dateStored[3];
      $(".link-to-page").attr('href', newURL(day, shortMonth, year));
    }
  //For inner pages
    else {
      var stringDate = currentURL.slice(-11);                                    // get string with date from URL
      console.log("from URL: " + stringDate);
      $.datepicker.setDefaults( $.datepicker.regional[ "" ] );
      var dateDate = $.datepicker.parseDate("yy/M/dd", stringDate);                 // convert to new Date
      $("#datepicker").datepicker($.datepicker.regional[ "uk" ]);
      console.log("parsed: " + dateDate);
      // start of repeating code?
      sessionStorage.setItem("date", dateDate);
      $("#datepicker").datepicker("setDate", dateDate);                              // highlight this Date as current
      var dateToNums = stringDate.split("/");                                        // get numbers for dd, mm, yy
      var day = dateToNums[2];
      var shortMonth = dateToNums[1];
      var year = dateToNums[0];
      var formattedDate = $.datepicker.formatDate("dd MM", dateDate, {
        monthNames: monthsNames
      });
      var dateToWords = formattedDate.split(" ");
      var month = dateToWords[1];                                                    // get string (word) equivalent for numMonth:
      $(".day").html(day);                                                           // fill datepicker-fields
      $(".month").html(month);                                                       // fill datepicker-fields
      var newDateStored = day + " " + month + " (" + shortMonth + ") " + year;
      sessionStorage.setItem("currentDate", newDateStored);                          // set var in sessionStorage
    }

    // Calculate prev/next day
    var currentDate = sessionStorage.getItem("date");
    var next = new Date(currentDate);
    var prev = new Date(currentDate);
    prev.setDate(prev.getDate() - 1);
    next.setDate(next.getDate() + 1);
    var prevDateLST = $.datepicker.formatDate("dd M yy", prev).split(" ");
    var nextDateLST = $.datepicker.formatDate("dd M yy", next).split(" ");
    $(".prev").attr("href", newURL(prevDateLST[0], prevDateLST[1], prevDateLST[2]));
    $(".next").attr("href", newURL(nextDateLST[0], nextDateLST[1], nextDateLST[2])); // both go-button on top and 'Next' link on the bottom are affected
    $(".home").attr("href", "/");                                                   // set links to the home page (logo and 'Home' on the bottom)

// Accessability: allow to choose day via tabulation
    function out_of_focus(id) {
      $(id).blur(function() {
        $(this).removeClass("ui-state-active");
      });
    }
    $(".ui-datepicker-next").attr("tabindex", "1");
    $(".ui-datepicker-next").focus(function() {
      console.log($(this).attr("Title"));
      tabulation();

    });


    function selDay(elem) {

        console.log("I'm inside selDay");

        $(elem).focus(function() {
          // datepicker_bindHover($("table.ui-datepicker-calendar a"));
          var day = $(this).html();
          console.log("I'm inside focus()");
          $(".ui-state-active").removeClass("ui-state-active");
          $(this).addClass("ui-state-active");
          $(".day").html(day);
        });
      }

    function tabulation() {
        $(".ui-datepicker-next").addClass("ui-state-active");
        $(".ui-datepicker-next").keydown(function(evt) {
          if (evt.which == 13) {
            $.datepicker._adjustDate("#datepicker", +1, "M");
            var current = $("#datepicker").datepicker("getDate");
            var plus_month = current.addMonths(1);
            //$("#datepicker").datepicker("setDate", plus_month);

            /* start of f */
            sessionStorage.setItem("date", plus_month);
            $("#datepicker").datepicker("setDate", plus_month);                              // highlight this Date as current
            var format_for_link = $.datepicker.formatDate("yy/M/dd", plus_month, {
              monthNames: monthsNames
            });
            console.log(format_for_link);
            //var dateToNums = stringDate.split("/");                                        // get numbers for dd, mm, yy
            //var day = dateToNums[2];
            //var shortMonth = dateToNums[1];
            //var year = dateToNums[0];
            var format_for_date_block = $.datepicker.formatDate("dd MM", plus_month, {
              monthNames: monthsNames
            });
            var dateToWords = format_for_date_block.split(" ");
            var month = dateToWords[1];                                                    // get string (word) equivalent for numMonth:
            $(".day").html(day);                                                           // fill datepicker-fields
            $(".month").html(month);                                                       // fill datepicker-fields
            //!! edit var newDateStored = day + " " + month + " (" + shortMonth + ") " + year;
            //!! sessionStorage.setItem("currentDate", newDateStored);                          // set var in sessionStorage

            /* end of f */

            $(".ui-datepicker-next").attr("tabindex", "2");
            $(".ui-datepicker-next").focus();
            tabulation();
            out_of_focus(".ui-datepicker-next");

            // Bind tabulation to the days of the next month
            selDay("table.ui-datepicker-calendar a");
          }
      });
    }
    out_of_focus(".ui-datepicker-next");
    selDay("table.ui-datepicker-calendar a");
    console.log($("#datepicker").datepicker("getDate", currentDate));

// Haldle tabulation on dates

// function datepicker_bindHover(dpDiv) {
//   console.log("I'm inside datepicker_bindHover!");
// 	var selector = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
// 	return dpDiv.delegate(selector, "mouseout", function() {
// 			$(this).removeClass("ui-state-hover");
// 			if (this.className.indexOf("ui-datepicker-prev") !== -1) {
// 				$(this).removeClass("ui-datepicker-prev-hover");
// 			}
// 			if (this.className.indexOf("ui-datepicker-next") !== -1) {
// 				$(this).removeClass("ui-datepicker-next-hover");
// 			}
// 		})
// 		.delegate( selector, "mouseover", datepicker_handleMouseover );
// }
//
// function datepicker_handleMouseover() {
// 	if (!$.datepicker._isDisabledDatepicker( datepicker_instActive.inline? datepicker_instActive.dpDiv.parent()[0] : datepicker_instActive.input[0])) {
// 		$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
// 		$(this).addClass("ui-state-hover");
// 		if (this.className.indexOf("ui-datepicker-prev") !== -1) {
// 			$(this).addClass("ui-datepicker-prev-hover");
// 		}
// 		if (this.className.indexOf("ui-datepicker-next") !== -1) {
// 			$(this).addClass("ui-datepicker-next-hover");
// 		}
// 	}
// }

// ************ //

      //$("#datepicker").datepicker("setDate", plus_month);

      //
      // $(this).keydown(function(evt) {
      //   var keyCode = evt.which;
      //   switch (keyCode) {
      //     case 40:  // DOWN, +1 week
      //       console.log("pressing down arrow");
      //       $.datepicker._adjustDate("#datepicker", +7, "D");
      //       console.log($("#datepicker").datepicker("getDate", currentDate));
      //       //$.datepicker._onSelect();
      //       break;
      //     default:
      //   }
      // });

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
