// Document.ready()

$(function() {

// ** UNCOMMENT TO CLEAN STORAGE
//sessionStorage.removeItem('dayStored');
//sessionStorage.removeItem('monthStored');

// UNCOMMENT TO TEST:
console.log(sessionStorage.getItem('dayStored'));
console.log(sessionStorage.getItem('monthStored'));

$(".day").html(sessionStorage.dayStored);
$(".month").html(sessionStorage.monthStored);

// *********************
// DATEPICKER
// *********************

  // initialize datepicker

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
        var newURL = "file://localhost/Users/yuriybesarab/Git/Days/dates/11/d" + day + "-" + month + "-2015.html";
        $(".link-to-page").attr('href', newURL);

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

        // update storage
        sessionStorage.setItem('dayStored', day);
        sessionStorage.setItem('monthStored', month);

        // update date-block fields on click
        $(".day").html(sessionStorage.dayStored);
        $(".month").html(sessionStorage.monthStored);

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
