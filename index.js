$('.nav').on('click', function(event) {
    $(this).parent().find('a').toggleClass('target');
    $(this).toggleClass('target');
});

$(window).on('scroll', function() {
    $('.target').each(function() {
        if($(window).scrollTop() >= $(this).offset().top) {
            $(this).toggleClass('target');
            }
        })
});