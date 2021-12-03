$(`li[data-rel="${2}"]`).addClass('active')
 
 // lọc
 $('document').ready(function ($) {
    var rows = $('#worktable tbody tr').each(function () {
        var row = $(this);
        var columns = row.children('td');
        row.data('sem', columns.eq(5).html());
    });
    var rows2 = $('#marktable tbody tr').each(function () {
        var row = $(this);
        var columns = row.children('td');
        row.data('sem', columns.eq(5).html());
        row.data('gpa', columns.eq(7).html());
        row.data('canhbaohocvu', columns.eq(8).html());
        row.data('tinchi', columns.eq(6).html());
    });
    $('#sem').change(function () {
        var i = 1;
        var sem = $('#sem').val().toString();

        document.getElementById('download_renluyen').action = `/download/<%= diemRenLuyen[0].malop %>/${sem}`;

        rows.each(function () {
            var row = $(this);
            var sem_to_match = row.data('sem');
            if (sem != 'all') {
                if (sem_to_match.includes(sem)) {
                    row.children('td').eq(0).html(i);
                    i++;
                    row.show();
                }
                else {
                    row.hide();
                }
            }
            else {
                row.show();
            }

        });
    });
    $('#sem_hoctap, #classify').change(function () {
        var i = 1;
        var sem = $('#sem_hoctap').val().toString();
        var classify = parseInt($('#classify').val());

        document.getElementById('download_hoctap').action = `/download/<%= diemSinhVien[0].malop %>/${sem}/${classify}`;

        rows2.each(function () {
            var row = $(this);
            var sem_to_match = row.data('sem').toString();
            var gpa = row.data('gpa');
            var canhbaohocvu = row.data('canhbaohocvu');
            var tinchi = row.data('tinchi');
            if (sem != 'all') {
                if (classify == 1) {
                    if (sem_to_match.includes(sem) && gpa >= 3.2) {
                        row.children('td').eq(0).html(i);
                        i++;
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else if (classify == 2) {
                    if (sem_to_match.includes(sem) && canhbaohocvu == "có") {
                        row.children('td').eq(0).html(i);
                        i++;
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else if (classify == 3) {
                    if (sem_to_match.includes(sem) && tinchi < 13) {
                        row.children('td').eq(0).html(i);
                        i++;
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else {
                    if (sem_to_match.includes(sem)) {
                        row.children('td').eq(0).html(i);
                        i++;
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
                        row.children('td').eq(0).html(i);
                        i++;
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else if (classify == 2) {
                    if (canhbaohocvu == "có") {
                        row.children('td').eq(0).html(i);
                        i++;
                        row.show();
                    }
                    else {
                        row.hide();
                    }
                }
                else if (classify == 3) {
                    if (tinchi < 13) {
                        row.children('td').eq(0).html(i);
                        i++;
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