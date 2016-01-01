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

    // HOVER ITEMS IN SELECTED BLOCK

    $(".control-hover").hover(
      function() {
        $(this).find('p').removeClass('transparent')
        .addClass('increase-fontSize');

        $(this).children('.red-square').css('background-color', '#b36665');
        },

      function() {
        $(this).find('p').addClass('transparent');
        /*$(this).find('p, h3').removeClass('increase-fontSize'); */
        $(this).children('.red-square').css('background-color', '#f5f7fb');
      }
    ); // end of hover on a line

    // HOVER ON SINGE ITEM

    $('.hover-sheet').hover(
      function() {
        $(this).css('backgroundColor', '#dbd8c9')
               .css('border', '2px solid #b3bcee');

        $(this).find('.ellipsis').css('background-color', "#dad8c9")
                                 .css('box-shadow', '-10px 0px 20px #dbd8c9');
      },
      function() {
        $(this).css('backgroundColor', '#f5f7fb')
               .css('border', '2px solid #f5f7fb');

        $(this).find('.ellipsis').css('backgroundColor', '#f5f7fb')
                                 .css('box-shadow', '-10px 0px 20px #f5f7fb');
      }
    ); // end of hover on item

    // scroll effect on date block

    $(window).scroll(function () {
      if ($(this).scrollTop() > 20) {
        $('.fixed').children('.day, .month').css('backgroundColor', 'white');
      }

      else {
        $('.fixed').children('.day, .month').css('backgroundColor', '#f4f6ec');
      }
    }); // end of scroll



}); // end of ready
