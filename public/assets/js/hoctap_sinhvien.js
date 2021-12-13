$(`li[data-rel="${2}"]`).addClass('active')

// lọc
$('document').ready(function ($) {

    var rows2 = $('#marktable tbody tr').each(function () {
        var row = $(this);
        var columns = row.children('td');
        row.data('sem', columns.eq(0).html());
        row.data('gpa', columns.eq(2).html());
        row.data('canhbaohocvu', columns.eq(3).html());
        row.data('tinchi', columns.eq(1).html());
    });
    $('#sem_hoctap, #classify').change(function () {
        var sem = $('#sem_hoctap').val().toString();
        var classify = parseInt($('#classify').val());
        var malop = document.getElementById('malop').value;
        var vaitro = document.getElementById('vaitro').value;
         if ( vaitro == 'covan') { 
            console.log(vaitro)
            document.getElementById('download_hoctap').action = `/download/${malop}/${sem}/${classify}`;
         } 


        rows2.each(function () {
            var row = $(this);
            var sem_to_match = row.data('sem').toString();
            var canhbaohocvu_tomatch = row.data('canhbaohocvu').toString();
            var gpa = row.data('gpa');
            var canhbaohocvu = row.data('canhbaohocvu');
            var tinchi = row.data('tinchi');
            if (sem != 'all') {
                if (classify == 1) {
                    if (sem_to_match.includes(sem) && gpa >= 3.2) {
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else if (classify == 2) {
                    if (sem_to_match.includes(sem) && canhbaohocvu_tomatch.includes('Cảnh cáo')) {
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else if (classify == 3) {
                    if (sem_to_match.includes(sem) && tinchi < 13) {
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else {
                    if (sem_to_match.includes(sem)) {
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
            }
            else {
                if (classify == 1) {
                    if (gpa >= 3.2) {
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else if (classify == 2) {
                    if (canhbaohocvu_tomatch.includes('Cảnh cáo')) {
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else if (classify == 3) {
                    if (tinchi < 13) {
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else {
                    row.show();
                }
            }
        });
    });
});

// Tìm kiếm sinh viên
$("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#marktable-body tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


if (localStorage.getItem("myselect")) {
    $('.class-list').val(localStorage.getItem("myselect"))
}

$('#logout').click(function () {
    $(".class-list").val($(".class-list option:first"));
})