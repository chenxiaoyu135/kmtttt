$(function(){
    $('.li-item-btn ').click(function(){
        $(this).toggleClass('active')
    })
    $('.saveCancel ').click(function(){
        $(this).addClass('active').siblings().removeClass('active')
    });

})