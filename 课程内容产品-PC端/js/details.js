;$(function () {
    //删除内容明细操作
   $('.text-green-right') .click(function () {
       $(this).parent().parent().remove();
       return false;
   })
});