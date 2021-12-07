$(`li[data-rel="${2}"]`).addClass('active')

// lọc
$('document').ready(function ($) {

    var rows2 = $('#table section').each(function () {
        var row = $(this);
        var columns = row.children('p');
        row.data('hocky', columns.eq(0).html());
    });
    $('#sem_hoctap').change(function () {
        var sem = $('#sem_hoctap').val().toString();

        rows2.each(function () {
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


if (localStorage.getItem("myselect")) {
    $('.class-list').val(localStorage.getItem("myselect"))
}

$('#logout').click(function () {
    $(".class-list").val($(".class-list option:first"));
})