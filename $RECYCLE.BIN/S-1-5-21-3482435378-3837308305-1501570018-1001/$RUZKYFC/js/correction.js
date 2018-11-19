;$(function () {
    $('.card2 .list .li div').click(function () {
     $(  this).addClass('li-title-active') .parent().siblings().children().removeClass('li-title-active')
    } )
$('.card-li-class').click(function () {
    $(this).addClass('on').siblings().removeClass('on')
})
$('.card-li-subject ').click(function () {
    $('.card-li-subject').toggleClass('toggle')
})
    $('.button div').click(function () {
        $(this).addClass('toggle-no').siblings().removeClass(' toggle-no')
    })
    $('.well-cell').click(function () {
     $( this).addClass('border').siblings().removeClass('border')
    })
});