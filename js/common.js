'use strict';
if (!window.console) window.console = {};
if (!window.console.memory) window.console.memory = function() {};
if (!window.console.debug) window.console.debug = function() {};
if (!window.console.error) window.console.error = function() {};
if (!window.console.info) window.console.info = function() {};
if (!window.console.log) window.console.log = function() {};

// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
    (function() {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            noFlexboxStickyFooter = function() {
                $pageBody.height('auto');
                if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
                } else {
                    $pageWrapper.height('auto');
                }
            };
        $(window).on('load resize', noFlexboxStickyFooter);
    })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
    (function() {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            ieFlexboxFix = function() {
                if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageWrapper.height($(window).height());
                    $pageBody.removeClass('flex-none');
                } else {
                    $pageWrapper.height('auto');
                }
            };
        ieFlexboxFix();
        $(window).on('load resize', ieFlexboxFix);
    })();
}

$(function() {

    // placeholder
    //-----------------------------------------------------------------------------
    $('input[placeholder], textarea[placeholder]').placeholder();

    $("#js-slider-sum").slider({
        range: true,
        range: "min",
        value: 20000,
        min: 1000,
        max: 100000,
        step: 500,
        slide: function(event, ui) {
            $("#amount").html(ui.value + '<span>руб.</span>');
            changeSum();
        }
    });
    $("#amount").html($("#js-slider-sum").slider("value") + '<span> руб.</span>');

    $("#js-slider-period").slider({
        range: "min",
        value: 10,
        min: 10,
        max: 20,
        step: 1,
        slide: function(event, ui) {
            $("#period").html(ui.value + '<span> дней.</span>');
            changeSum();
        }
    });
    $("#period").html($("#js-slider-period").slider("value") + '<span> дней.</span>');

    function changeSum() {
        var sum = $("#js-slider-sum").slider("value") / 100 * 20 * $("#js-slider-period").slider("value");
        $('.js-calc-result').val(sum + ' руб.');
    }

    changeSum();


    $.datepicker.setDefaults({
        dateFormat: 'd MM yy г.'
    });

    $('.js-date').datepicker({
        minDate: 0
    }).datepicker("setDate", new Date());


    var mobBtn = $('.js-show-mobile-menu');
    var mobMenu = $('.header__mob-menu');

    mobBtn.on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            mobMenu.slideUp(400);
        } else {
            $(this).addClass('active');
            mobMenu.slideDown(400);

        }
    })

    $('.js-check-phone').on('keyup', function() {
        if ($(this).val().length > 5) {
            $('.application__phone-btn').removeClass('disabled');
        } else {
            $('.application__phone-btn').addClass('disabled');
        }

    });

    $('#js-valid-form-zaem').validate({
        rules: {
            name: {
                required: true
            },
            email: {
                required: true
            },
            phone: {
                required: true
            },
            rules:{
                required: true
            },
            dates:{
                required: true
            }
        },
        messages: {
            name: {
                required: 'Введите свое ФИО'
            },
            email: {
                required: 'Введите свой email'
            },
            phone: {
                required: 'Введите свой телефон'
            },
            rules:{
                required: 'Вы должны согласится с правилами предоставления займа'
            },
            dates:{
                required: 'Вы должны согласится на обработку персональных данных'
            }
        }
    })
});
