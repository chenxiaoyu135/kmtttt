;$(function () {

    $(' .addActive').click(function () {
        $(this).addClass('active').siblings().removeClass('active')
    });

    $('.list-group ').click(function () {
        $('.xdot', this).toggle()
    });
    $('.list-li-head li ').hover(function () {
        $('.menu-box', this).show();
    }, function () {
        $('.menu-box', this).hide();

    });
    $('.content-text-right').click(function () {
        $('a', this).toggleClass('active')
    })
    //    添加学生
    $('.user').click(function () {
        $('.mask').css('display', 'block')
    })
    $('.glyphicon-remove').click(function () {
        $('.mask').css('display', 'none')
    });


    $('.masktwo-li').click(function () {
        $( this).addClass('active').siblings().removeClass('active')
    })
    $('.mask-content-btn ').click(function () {
        $('a', this).toggleClass('active')
    })

    $('.groupName').click(function () {
        $('.maskthree').css('display','block')
    });
    $('.glyphicon-remove').click(function () {
        $('.maskthree').css('display', 'none')
    });
    $('.head-img').click(function () {
        $(this).addClass('on')

    })
});
