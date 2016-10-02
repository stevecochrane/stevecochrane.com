// //  The Recent Work carousel script, made into a jQuery plugin just for funsies.
// //  Applicable to any list of things that need to be rotated one by one.
// (function($) {
//     $.fn.carousel = function(intervalDuration) {
//
//         var currentListElement = 0,
//             listElements = this.find('li'),
//             lastListElement = listElements.length - 1,
//             rotateListElements;
//
//         rotateListElements = function() {
//             //  Check if we've reached the last list element of the group.
//             if (currentListElement !== lastListElement) {
//                 //  If not, increment the counter and show the next list element.
//                 currentListElement += 1;
//                 listElements.eq(currentListElement)
//                     .removeClass('is-hidden-immediately')
//                     .addClass('is-showing');
//
//             } else {
//                 //  If so, hide the middle list elements (all but first and last) immediately.
//                 //  Keep the first showing since we'll fade back to it next.
//                 for (var i = 1; i < lastListElement; i += 1) {
//                     listElements.eq(i)
//                         .removeClass('is-showing')
//                         .addClass('is-hidden-immediately');
//                 }
//                 //  Then fade out the last (current) list element to reveal the first.
//                 listElements.eq(currentListElement).removeClass('is-showing');
//                 //  Reset the counter to start the loop over from the beginning.
//                 currentListElement = 0;
//             }
//         };
//
//         //  Call the above rotateListElements function on the specified time interval.
//         setInterval(rotateListElements, intervalDuration);
//         //  Set up for jQuery chaining.
//         return this;
//
//     };
// })(jQuery);
//
// //  Initialize carousel on #work (index page) when the page has finished loading
// $(function() {
//     $('#work').carousel(5000);
// });

function Carousel(elem) {
    this.elem = elem;
    this.init();
}

Carousel.prototype.init = function() {
    console.log("Carousel.init");
};

function addLoadEvent(newFunction) {
    var currentOnload = window.onload;
    if (typeof window.onload != "function") {
        window.onload = newFunction;
    } else {
        window.onload = function() {
            currentOnload();
            newFunction();
        };
    }
}

addLoadEvent(function() {
    var carousels = document.querySelectorAll(".carousel");
    carousels.forEach(function(carousel) {
        var newCarousel = new Carousel(carousel);
    });
});
