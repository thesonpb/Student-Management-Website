
    // Tìm kiếm sinh viên
    $("#myInput").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".stu-table-body tr").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
   
    // chọn lớp học
    $('.class-list li').click(function () {
        $(this).addClass('active')
        $('.class-list li').not($(this)).removeClass('active');
    });
    // chọn phần bên nav 
    $('.nav li').click(function () {
        $(this).addClass('active')
        $('.nav li').not($(this)).removeClass('active');
        $('.main:nth-of-type(' + $(this).data('rel') + '').stop().fadeIn(400, 'linear').siblings('.main').stop().fadeOut(0, 'linear');
    });
   
  