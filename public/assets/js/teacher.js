$(`li[data-rel="${1}"]`).addClass('active')

var stdTable = $('#student-table');
var tbody = $('.stu-table-body')

//Sửa 1 dong trong danh sách
// const tableBtn = $('.stu-btn')
var stuLength = tbody.data('rel');
function onEditRow(e) {
    if (!e.target.classList.contains('stu-btn')) {
        return;
    }

    var tableBtn = e.target;

    var tds = $(tableBtn).closest("tr").find('td');
    delete tds['0'];
    delete tds['9'];
    delete tds['10'];
    delete tds['length'];
    delete tds['prevObject'];

    for (var i = 0; i < stuLength; i++) {
        const editTableBtn = $(`.edit-btn-${i + 1}`)
        const saveTableBtn = $(`.save-btn-${i + 1}`)
        if (saveTableBtn.css('display') == 'none') {
            saveTableBtn.show('fast').css("display", "inline-block");
            editTableBtn.hide('fast')
        } else {
            saveTableBtn.hide('fast');
            editTableBtn.show('fast');
            editStuInfor(e);
        }
    }


    for (const [key, value] of Object.entries(tds)) {
        td = value
        td.contentEditable = !td.isContentEditable;
        if (td.contentEditable === 'false') {
            td.style.opacity = '1';
        } else {
            td.style.opacity = '0.5';
            td.value = "Save";
        }
    }
}
stdTable.click(onEditRow);

var editForm = $("#editstudentinfo")

function editStuInfor(e) {
    if (!e.target.classList.contains('stu-btn')) {
        return;
    }

    var tableBtn = e.target;

    var tds = $(tableBtn).closest("tr").find('td');
    var input1 = $("<input />", {
        name: "hoten",
        value: tds['2'].innerHTML.trim(),
        type: "hidden"
    });

    // var input2 = $("<input />", {
    //     name: "ngaysinh",
    //     value: tds['3'].innerHTML.trim(),
    //     type: "hidden"
    // });

    var input3 = $("<input />", {
        name: "malop",
        value: tds['4'].innerHTML.trim(),
        type: "hidden"
    });

    var input4 = $("<input />", {
        name: "email",
        value: tds['5'].innerHTML.trim(),
        type: "hidden"
    });

    var input5 = $("<input />", {
        name: "sdt",
        value: tds['6'].innerHTML.trim(),
        type: "hidden"
    });

    editForm.append(input1, input3, input4, input5);
    editForm.submit();
};

// Tìm kiếm sinh viên
$("#myInput").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $(".stu-table-body tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
});


if (localStorage.getItem("myselect")) {
    $('.class-list').val(localStorage.getItem("myselect"))
}

$('#logout').click(function () {
    $(".class-list").val($(".class-list option:first"));
})

