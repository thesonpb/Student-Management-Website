$(`li[data-rel="${3}"]`).addClass('active');

$('document').ready(function ($) {

    var rows = $('#worktable tbody tr').each(function () {
        var row = $(this);
        var columns = row.children('td');
        row.data('sem', columns.eq(5).html());
    });

    $('#sem').change(function () {
        var i = 1;
        var sem = $('#sem').val().toString();
        var malop = document.getElementById('malop').value;
        document.getElementById('download_renluyen').action = `/download/${malop}/${sem}`;

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
});