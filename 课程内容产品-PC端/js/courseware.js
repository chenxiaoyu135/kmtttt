;$(function () {
    $('.nav li').hover(function () {
        $('.showHide',this).show( )
    },function () {
        $('.showHide',this). hide( );
    }) ;
    //删除操作
    $('.del') .click(function () {
        $(this).parent().parent().remove();
        return false;
    })
});