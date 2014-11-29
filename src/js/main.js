//  The Recent Work rotation script, made into a jQuery plugin just for funsies.
//  Applicable to any list of things that need to be rotated one by one.
(function($) {
    $.fn.listRotator = function(intervalDuration) {

        var currentListElement = 0,
            listElements = this.find('li'),
            lastListElement = listElements.length - 1,
            rotateListElements;

        rotateListElements = function() {
            //  Check if we've reached the last list element of the group.
            if (currentListElement !== lastListElement) {
                //  If not, increment the counter and show the next list element.
                currentListElement += 1;
                listElements.eq(currentListElement)
                    .removeClass('is-list-rotator-item-hidden-immediately')
                    .addClass('is-list-rotator-item-showing');

            } else {
                //  If so, hide the middle list elements (all but first and last) immediately.
                //  Keep the first showing since we'll fade back to it next.
                for (var i = 1; i < lastListElement; i += 1) {
                    listElements.eq(i)
                        .removeClass('is-list-rotator-item-showing')
                        .addClass('is-list-rotator-item-hidden-immediately');
                }
                //  Then fade out the last (current) list element to reveal the first.
                listElements.eq(currentListElement).removeClass('is-list-rotator-item-showing');
                //  Reset the counter to start the loop over from the beginning.
                currentListElement = 0;
            }
        };

        //  Call the above rotateListElements function on the specified time interval.
        setInterval(rotateListElements, intervalDuration);
        //  Set up for jQuery chaining.
        return this;

    };
})(jQuery);

//  Initialize listRotator on #work (index page) when the page has finished loading
$(function() {
    $('#work').listRotator(5000);
});

/*  
    From "How to Track Downloads & Outbound Links in Google Analytics":
    http://www.blastam.com/blog/index.php/2013/03/how-to-track-downloads-in-google-analytics-v2/

    This timeout method breaks Cmd + click to open in a new tab for Safari (and possibly others)
    so I've disabled tracking for everything except downloads since that's all I'm trying for.
*/
if (typeof jQuery != 'undefined') {
    jQuery(document).ready(function($) {
        var filetypes = /\.(zip|exe|dmg|pdf|doc.*|xls.*|ppt.*|mp3|txt|rar|wma|mov|avi|wmv|flv|wav)$/i;
        var baseHref = '';
        if (jQuery('base').attr('href') !== undefined) baseHref = jQuery('base').attr('href');

        jQuery('a').on('click', function(event) {
            var el = jQuery(this);
            var track = true;
            var href = (typeof(el.attr('href')) != 'undefined' ) ? el.attr('href') :"";
            var isThisDomain = href.match(document.domain.split('.').reverse()[1] + '.' + document.domain.split('.').reverse()[0]);
            if (!href.match(/^javascript:/i)) {
                var elEv = [];
                elEv.value = 0;
                elEv.non_i = false;
                if (href.match(/^mailto\:/i)) {
/*
                    elEv.category = "email";
                    elEv.action = "click";
                    elEv.label = href.replace(/^mailto\:/i, '');
                    elEv.loc = href;
*/
                    track = false;
                }
                else if (href.match(filetypes)) {
                    var extension = (/[.]/.exec(href)) ? /[^.]+$/.exec(href) : undefined;
                    elEv.category = "download";
                    elEv.action = "click-" + extension[0];
                    elEv.label = href.replace(/ /g,"-");
                    elEv.loc = baseHref + href;
                }
                else if (href.match(/^https?\:/i) && !isThisDomain) {
/*
                    elEv.category = "external";
                    elEv.action = "click";
                    elEv.label = href.replace(/^https?\:\/\//i, '');
                    elEv.non_i = true;
                    elEv.loc = href;
*/
                    track = false;
                }
                else if (href.match(/^tel\:/i)) {
/*
                    elEv.category = "telephone";
                    elEv.action = "click";
                    elEv.label = href.replace(/^tel\:/i, '');
                    elEv.loc = href;
*/
                    track = false;
                }
                else track = false;

                if (track) {
                    _gaq.push(['_trackEvent', elEv.category.toLowerCase(), elEv.action.toLowerCase(), elEv.label.toLowerCase(), elEv.value, elEv.non_i]);
                    if ( el.attr('target') === undefined || el.attr('target').toLowerCase() != '_blank') {
                        setTimeout(function() { location.href = elEv.loc; }, 400);
                        return false;
                    }
                }
            }
        });
    });
}