
;$(function () {
    $('.li-submit ').click(function(){
        $('.saveCancel').toggleClass('active')
    })
    $(' .addActive').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    });

    $('.list-li-head li ').click(function () {
        $( '.xdot',this).toggle()
    } );
    $('.list-li-head li ').hover(function () {
        $('.menu-box',this).show( );
    },function () {
        $('.menu-box',this). hide( );

    }) ;
    $('.content-text-right').click(function () {
        $('a',this) .toggleClass('active')
    })
    $('.template').click(function () {
        $('.mask').css('display','block')
    })
    $('.del').click(function () {
        $('.mask').css('display','none')
    })

});