;$(function () {
    $('.text-active-left').click(function () {
        $('.maskA').css('display', 'block')
    });
    $('.glyphicon-remove').click(function () {
        $('.maskA').css('display', 'none')
    })
});

$(function () {
    $(' .addActive').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    });


});
$(function () {

    $(document).on('click', '.card-li-btn span', function () {
        if ($(this).text() == '+继续编辑') {
            $(this).parents('.card-li-content').find('.card-li-edit').attr("contenteditable", true);
            $(this).text('+完成编辑')
        } else {
            $(this).parents('.card-li-content').find('.card-li-edit').attr('contenteditable', false);
            $(this).text('+继续编辑')
            console.log($(this).parents('.card-li-content').find('.card-li-edit').html())
        }
    })

    $(document).on('click', '.sub-item', function () {
        $(this).addClass('active').siblings().removeClass('active')
    })

    $('.sub-max').click(function () {
        if ($(this).prev().hasClass('active')) {
            $(this).find('.sub-max-text').text('展开')
        } else {
            $(this).find('.sub-max-text').text('收起')
        }
        $(this).prev().toggleClass('active')
        $(this).toggleClass('active')
    })

    $('.card-li-content-more').click(function () {
        if ($(this).prev('.card-li-edit-detail').hasClass('active')) {
            $(this).find('.span-text').text('展开答案及解析')
        } else {
            $(this).find('.span-text').text('收起答案及解析')
        }
        $(this).prev('.card-li-edit-detail').toggleClass('active')
        $(this).toggleClass('active')
    })

    $('.footer-row').on('click', function () {
        if ($(this).parent().find('.height').hasClass('active')) {
            $(this).find('span').text('收起这部分')
        } else {
            $(this).find('span').text('展开这部分')
        }
        $(this).parent().find('.height').toggleClass('active')
        $(this).find('img').toggleClass('active')
    })

    $('.card-li-content-header-item').click(function (e) {
        $(this).removeClass('active').siblings().addClass('active')
    })

    // 动态处理左边栏浮动定位
    var wh = $(window).height();
    var nav = $('.navbar-fixed-top').height();
    var head = $('.head').height();
    var width = $('.scroll-move').width();
    var height = wh - nav - 45;
    var top = nav + 45;

    function resizeLeftDiv() {
        $('.scroll-move.active').css({'width': width + 'px', 'height': height + 'px', 'top': top + 'px'})
    }

    $(document).on('scroll', function (e) {
        var right = $('.scroll-right').height();
        var a = $(this).scrollTop()
        if (a > head + nav && right > wh) {
            $('.scroll-move').addClass('active')
            $('#toTop').addClass('active')
            resizeLeftDiv();
        } else {
            $('.scroll-move.active').removeClass('active')
            $('#toTop.active').removeClass('active')
            $('.scroll-move').css({'width': 'auto', 'height': 'auto', 'top': '0px'})
        }
    })

    $(window).resize(function (e) {
        resizeLeftDiv();
    })

    $(window).load(function () {
        resizeLeftDiv();
    })

    // 滚动到顶部
    $('#toTop').click(function () {
        $('body,html').animate({scrollTop: 0}, 800);
    })

    // 隐藏tips
    $('.tip-icon-1').click(function () {
        $(this).parents('.tip-container').hide()
    })
    //tips的显示与隐藏更改内容样式
    $(document).ready(function () {
        $('.tip-fistCard').hover(function () {
            $(".tip-fistCard").css('display', 'none')
            $(".xcard").css('display', 'block');
        }, function () {

            $(".xcard").css('display', 'none');

        });

        $(".xcard").hover(function () {
            $(this).css('display', 'block');
        }, function () {
            $(this).css('display', 'none');
            $(".tip-fistCard").css('display', 'block')
        });
    })

})