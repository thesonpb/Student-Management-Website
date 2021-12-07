$(`li[data-rel="${2}"]`).addClass('active')

// lọc
$('document').ready(function ($) {
    $('#sem_hoctap').change(function () {
        var sem = this.value.toString();
        console.log(sem)

        $('#info .row p[data-rel="hocky"]').each(function () {
            var row = $(this);
            var sem_to_match = row.html();
            console.log(sem_to_match);

            if (sem_to_match === sem ) {
                console.log(true)
            }
            else {
                console.log(false)
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