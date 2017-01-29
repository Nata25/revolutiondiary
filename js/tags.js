// fire this function only on screens (not screen readers or print mode)

window.onload = function() {

    var paragraphs = document.getElementsByClassName("tag-entry");
    var lastId = paragraphs.length;
    var num;

    // find if we need separate pages:
    if (lastId > 15) {
       generateButtons();
//     add buttons event listeners
//     -deActivate(buttonId); (done by virtual click)
//     -display(0, 10); (done by virtual click)
//
    }
//
function generateButtons() {
//     find number of buttons:
         num = (lastId - lastId%10) / 10; // this is a global variable
         console.log("paragraphs on the page: " + lastId);
         var addOne = (lastId % 10 > 3) ? 1 : 0;
         console.log(addOne);
         num += addOne;
         console.log("number of buttons needed: " + num);
//
//     drawButtons(num);
}
//
// button event listener on click (id) {
//     find start_end(id)
//     display(start, end)
//     deActivate(id)
// }
//
//
// find start_end(id) {
//     if current button is not active (has href attr):
//         end = 10 * id
//         start = end - 10
//         if id == num (number of buttons)
//               end = lastId
//         else end -= 1
//         return start, end
// }
//
// example:
// 1     0 - 9
// 2     10 - 19
// 3     20 - 32
//
// display(start, end) {
//     get all paragraphs
//     for each : filter () {
//         if id < start or id > end:
//               hide paragraph
//     }
// }
//
//  deActivate(id) {
//         get all buttons
//         for each:
//              if button id != id:
//                  add href="#" attr
// }
//
// click first button


} // end of ready;
