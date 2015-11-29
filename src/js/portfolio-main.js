$(function() {
    $('img.lazy')
        .css('max-height', function() {
            return $(this).attr('height') + 'px';
        })
        .show()
        .lazyload({
            effect: "fadeIn",
            threshold: 400
        }
    );
});