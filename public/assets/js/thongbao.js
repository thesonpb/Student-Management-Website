$(`li[data-rel="${5}"]`).addClass('active')
 
//Huỷ bỏ đăng câu hỏi diễn đàn
$('.js-close-btn').click(function (e) {
   $('#question-form').collapse("hide");
})


if (localStorage.getItem("myselect")) {
   $('.class-list').val(localStorage.getItem("myselect"))
}

$('#logout').click(function () {
   $(".class-list").val($(".class-list option:first"));
})