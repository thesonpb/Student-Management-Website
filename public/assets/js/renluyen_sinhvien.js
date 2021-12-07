$(`li[data-rel="${3}"]`).addClass('active')

$('document').ready(function ($) {
    var rows = $('#table section').each(function () {
        var row = $(this);
        var columns = row.children('p');
        row.data('hocky', columns.eq(0).html());
        var sem_to_match = row.data('hocky').toString();
        if (!sem_to_match.includes(sem)) {
            row.hide();
        }
    });
   
    $('#sem').change(function () {
        var sem = $('#sem').val().toString();

        rows.each(function () {
            var row = $(this);
            var sem_to_match = row.data('hocky').toString();
            if (sem_to_match.includes(sem)) {
                row.show();
            }
            else {
                row.hide();
            }
        });
    });
});
// Tìm kiếm sinh viên
$("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".worktable-body tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


if (localStorage.getItem("myselect")) {
    $('.class-list').val(localStorage.getItem("myselect"))
}

$('#logout').click(function () {
    $(".class-list").val($(".class-list option:first"));
})