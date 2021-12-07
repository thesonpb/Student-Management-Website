$(`li[data-rel="${4}"]`).addClass('active')
 
//Huỷ bỏ đăng câu hỏi diễn đàn
$('.red-btn').click(function (e) {
   $('#todo-form').collapse("hide");
})


if (localStorage.getItem("myselect")) {
   $('.class-list').val(localStorage.getItem("myselect"))
}

$('#logout').click(function () {
   $(".class-list").val($(".class-list option:first"));
})