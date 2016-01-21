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
        var dateInNums = dateString[0] + dateString[2];
        var year = dateString[3];

//*** Store selected date in storage to grab it on return to index.html:
        sessionStorage.setItem("currentDate", dateText);
        console.log(sessionStorage.getItem("currentDate"));

//*** Change link on go-button according to the selected date
        var newURL = "file://localhost/Users/yuriybesarab/Git/Days/page" + day + "-" + numMonth + "-" + year + ".html";
        $(".link-to-page").attr('href', newURL);
        console.log(newURL);

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

  //For inner pages:
    if (currentURL.slice(-10, -5) !== "index") {
      var stringDate = currentURL.slice(-15, -5);
      var dateDate = $.datepicker.parseDate("dd-mm-yy", stringDate);
      $("#datepicker").datepicker("setDate", dateDate);
      var dateToNums = stringDate.split("-");
      var day = dateToNums[0];
      var numMonth = dateToNums[1];
      var year = dateToNums[2];
      var newURL = "file://localhost/Users/yuriybesarab/Git/Days/page" + day + "-" + numMonth + "-" + year + ".html";
      $(".link-to-page").attr('href', newURL);
      console.log(newURL);
      // get string (word) equivalent for numMonth:
      var formattedDate = $.datepicker.formatDate("dd MM", dateDate, {
        monthNames: ["січня", "лютого", "березня", "квітня", "червня", "травня", "липня", "серпня", "вересня", "жовтня", "листопада", "грудня"]
      });
      var dateToWords = formattedDate.split(" ");
      $(".day").html(day);
      $(".month").html(dateToWords[1]);

    }
  //For home page
    else {
      $("#datepicker").datepicker("setDate", sessionStorage.getItem("currentDate"));
      var dateStored = sessionStorage.getItem("currentDate").split(" ");
      var day = dateStored[0];
      $(".day").html(day);
      $(".month").html(dateStored[1]);
      var numMonth = dateStored[2].slice(1, 3);
      var year = dateStored[3];
      console.log(numMonth);
      var newURL = "file://localhost/Users/yuriybesarab/Git/Days/page" + day + "-" + numMonth + "-" + year + ".html";
      $(".link-to-page").attr('href', newURL);
      console.log(newURL);
    }

// *****************************
// CALCULATE HEIGHT OF HERO AREA
// (not for mobile and Kindle)
// *****************************

  var initHeight = window.innerHeight - 115;
  //console.log(hght);
  var initWidth = window.innerWidth;
  if (initWidth > 800 && initWidth < 1600) {
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

    $(window).scroll(function () {
      if ($(this).scrollTop() > 30) {
        $('.fixed').children('.day, .month').css('backgroundColor', '#f5f7fb');
      }

      else {
        $('.fixed').children('.day, .month').css('backgroundColor', '#f4f6ec');
      }
    }); // end of scroll

// **************************
// HOVER ON VERTICAL LOGO (INNER PAGES)
// **************************
    $(".vertical-logo").hoverIntent(
      function() {
        $(this).addClass("transparent");
        $(this).prev(".home-slide").removeClass("slide-up").addClass("slide-down");
      },
      function() {
        $(this).removeClass("transparent");
        $(this).prev(".home-slide").removeClass("slide-down").addClass("slide-up");
      }
    ); // end of hover

}); // end of ready
