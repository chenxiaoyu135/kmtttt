
;$(function(){
    $('.nav li').hover(function () {
        $('.showHide',this).show( );
    },function () {
        $('.showHide',this). hide( );

    }) ;
    $(' .addActive').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    });



});