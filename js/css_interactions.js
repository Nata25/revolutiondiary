// ***********************************
//***** CSS ADDITIONAL FUNCTION *****//
// ***********************************

// Document.ready()
$(function() {

// SELECTORS USED

var tags = $(".tags-cloud-main a, .tags-cloud-inner a");
var button = $(".link-to-page");
var absolute = $('.absolute');
var fixed = $('.fixed');
var box = $('.box');
var controlHover = $(".control-hover");
var hoverSheet = $('.hover-sheet');
var dateBlock = $('.date-block');

/*** Render shadow effect on button when focus in (if there's no default effect in browser, e.g. in Mozilla) ***/

button.focus(function() {
  $(this).find("#button").css("box-shadow", "0 0 20px 2px #b3bcee");
});

button.blur(function() {
  $(this).find("#button").css("box-shadow", "none");
});

/*** STICK SIDEBAR to the left (Kindle) ****/
  function findLeftMargin(wdth) { return (wdth - 1900) / 2}
  var initWidth = window.innerWidth;
  if (initWidth > 2140) {
    var onHome = findLeftMargin(initWidth) + 10;
    var onInner = onHome + 100;
    var verLogo = onHome - 40;
    absolute.css("left", onHome);
    fixed.css("left", onInner);
    box.css("left", verLogo);
  }
  $(window).resize(function() {
    var resizedWidth = window.innerWidth;
    if (resizedWidth > 2140) {
      var onHome = findLeftMargin(resizedWidth) + 10;
      var onInner = onHome + 100;
      var verLogo = onHome - 40;
      absolute.css("left", onHome);
      fixed.css("left", onInner);
      box.css("left", verLogo);
    }
 });

// *****************************
// HOVER ITEMS IN SELECTED BLOCK
// *****************************

// Helper functions

  // When cursor/focus is
  function on_control() {
    $(this).find('p')
      .removeClass('mid-transparent')
      .addClass('increase-fontSize');

    $(this).children('.red-square').css('background-color', '#b36665');
    $(this).siblings('.red-square').css('background-color', '#b36665');

    $(this).find('.ellipsis')
              .css('color', '#715139')
              .addClass('increase-fontSize');
    }

  function outof_control() {
        $(this).find('p').addClass('mid-transparent');
        $(this).find('p').removeClass('increase-fontSize');

        $(this).children('.red-square').css('background-color', '#f5f7fb');
        $(this).siblings('.red-square').css('background-color', '#f5f7fb');

        $(this).find('.ellipsis').css('color', '#bda492')
                  .removeClass('increase-fontSize');
      }

 function on_item() {
      $(this).css(
        { 'background-color': '#dcd9d4',
          'border': '1px solid #f6efe0',
          'box-shadow': '0 0 4px #b3bcee'
        });
      $(this).find('.ellipsis').css(
        { 'backgroundColor': '#dcd9d4',
          'box-shadow': '-10px 0px 20px #dcd9d4'
        });
  }

  function outof_item() {
    $(this).css(
      { 'background-color': '#f5f7fb',
        'border': '1px solid #f5f7fb',
        'box-shadow': '0 0 5px #f5f7fb'
      });
    $(this).find('.ellipsis').css(
      { 'backgroundColor': '#f5f7fb',
        'box-shadow': '-10px 0px 20px #f5f7fb'
      });
  }

  if (initWidth > 800) {                 // no hover effects on mobiles
    // HOVER ON A LINE
    controlHover.hover(on_control, outof_control);

    // HOVER/FOCUS ON SINGE ITEM
    hoverSheet.hover(on_item, outof_item);
    hoverSheet.focus(on_item);
    hoverSheet.focus(on_control);
    hoverSheet.blur(outof_item);
    hoverSheet.blur(outof_control);
  }
  else {
    hoverSheet.find('p').removeClass("mid-transparent");
  }

// ***********************
// TABULATION OF TAGS
// ***********************
  tags.focus(function() {
    $(this).css("color", "#936565");
  });
  tags.blur(function() {
    $(this).css("color", "#A9AAAC");
  });

// **************************
// FADE ON VISIBLE ITEMS
// **************************

  var win = $(window);
  var allItems = controlHover;

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
  var dates = dateBlock.children('.day, .month');
  var mql = window.matchMedia("screen and (min-width: 1400px)");

  function styleDateBlock(mql) {
    if (mql.matches) {
      var offsetY = dateBlock.offset()['top'];

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
