     function clickNav(e) {
         console.log(e.target)
     }

     $('.nav').click(clickNav)

     //Huỷ bỏ đăng câu hỏi diễn đàn
     $('.js-close-btn').click(function (e) {
        $('#question-form').collapse("hide");
    })