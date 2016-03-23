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
        var dateInNums = dateString[0] + dateString[2];
        var year = dateString[3];

//*** Store selected date in storage to grab it on return to index.html:
        sessionStorage.setItem("currentDate", dateText);

//*** Load new page corresponding to the date
        var lnk = newURL(day, shortMonth, year);
        window.location = lnk;

      }) // end of onSelect

    }); // end of .datepicker() initialization

    $("#datepicker").datepicker($.datepicker.regional["uk"]);

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
      sessionStorage.setItem("date", dateDate);
      $("#datepicker").datepicker("setDate", dateDate);                              // highlight this Date as current
      var dateToNums = stringDate.split("/");                                        // get numbers for dd, mm, yy
      var day = dateToNums[2];
      var shortMonth = dateToNums[1];
      var year = dateToNums[0];
      var formattedDate = $.datepicker.formatDate("dd MM", dateDate, {
        monthNames: monthsNames
      });                                                                            // get string (word) equivalent for numMonth:
      var dateToWords = formattedDate.split(" ");
      var month = dateToWords[1];
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

// ***********************************
//***** CSS ADDITIONAL FUNCTION *****//
// ***********************************

/*** STICK SIDEBAR to the left (Kindle) ****/
  function findLeftMargin(wdth) { return (wdth - 1900) / 2}
  var initWidth = window.innerWidth;
  if (initWidth > 2140) {
    var onHome = findLeftMargin(initWidth) + 10;
    var onInner = onHome + 100;
    var verLogo = onHome - 40;
    $('.absolute').css("left", onHome);
    $('.fixed').css("left", onInner);
    $('.box').css("left", verLogo);
  }
  $(window).resize(function() {
    var resizedWidth = window.innerWidth;
    if (resizedWidth > 2140) {
      var onHome = findLeftMargin(resizedWidth) + 10;
      var onInner = onHome + 100;
      var verLogo = onHome - 40;
    //  console.log(left);
      $('.absolute').css("left", onHome);
      $('.fixed').css("left", onInner);
      $('.box').css("left", verLogo);
    }
 /*** revert auto height if the page is resized to mobile version ***/
//     if (resizedWidth < 800) {
//       $('.hero').css("height", "550px");
//     }
 });

// *****************************
// HOVER ITEMS IN SELECTED BLOCK
// *****************************
  if (initWidth > 800) {                 // no hover effects on mobiles
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
        $(this).css(
          {
            'background-color': '#dcd9d4',
            'border': '1px solid #f6efe0',
            'box-shadow': '0 0 4px #b3bcee'
          });

        $(this).find('.ellipsis').css(
          {
            'backgroundColor': '#dcd9d4',
            'box-shadow': '-10px 0px 20px #dcd9d4'
          });
      },
      function() {

        $(this).css(
          {
            'background-color': '#f5f7fb',
            'border': '1px solid #f5f7fb',
            'box-shadow': '0 0 5px #f5f7fb'
          });

        $(this).find('.ellipsis').css(
          {
            'backgroundColor': '#f5f7fb',
            'box-shadow': '-10px 0px 20px #f5f7fb'
          });

      } // end of second hover argument
    ); // end of hover on item
  }
  else {
      $(".hover-sheet").find('p').removeClass("mid-transparent");
      $(".ellipsis").css("top", "154px");
  }
 // end of if statement

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

  // Perform on widescreens only (the rest is handled by css)
  var dates = $('.date-block').children('.day, .month');
  var mql = window.matchMedia("screen and (min-width: 1400px)");

  function styleDateBlock(mql) {
    if (mql.matches) {
      var offsetY = $('.date-block').offset()['top'];

      // if we at the top of the page, make .date-block white
      // (= .js placeholder for css media query)
      if (offsetY < 40) {
        dates.addClass('white');
      }
      // remove .blue class if the page has been scrolled down and resized to < 1400px
      else {
        dates.removeClass('blue');
      }

    // change color of .date-block on scroll and w>1400px
      $(window).scroll(function () {
        if (mql.matches) {
            if ($(this).scrollTop() > 40) {
              dates.removeClass('white').addClass('blue');
              $('#button').removeClass('increase');
            }
            else  {
              dates.removeClass('blue').addClass('white');
              $('#button').addClass('increase');
            }
          } // end of if; no scroll effects on w<1400px
      }); // end of scroll
    } // end of if statement

    // if w<1400px (Listener checks), remove additional styling classes and reset to default css values
    else {
      dates.removeClass('white blue');
    }
  } // end of function

  styleDateBlock(mql);
  mql.addListener(styleDateBlock);

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
