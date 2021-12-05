$(`li[data-rel="${1}"]`).addClass('active')

var stdTable = $('#student-table');
var tbody = $('.stu-table-body')

//Sửa 1 dong trong danh sách
function onEditRow(e) {
    if (!e.target.classList.contains('stu-btn')) {
        return;
    }
    var tableBtn = e.target;
    var tds = $(tableBtn).closest("tr").find('td');
    const editTableBtn = $(tds['10'].firstChild.nextSibling.nextSibling.nextSibling);
    const saveTableBtn = $(tds['10'].lastChild.previousSibling);

    if (saveTableBtn.css('display') == 'none') {
        saveTableBtn.show('fast').css("display", "inline-block");
        editTableBtn.hide('fast')
    } else {
        saveTableBtn.hide('fast');
        editTableBtn.show('fast');
        editStuInfor(e);
    }

    delete tds['0'];
    delete tds['1'];
    delete tds['9'];
    delete tds['10'];
    delete tds['length'];
    delete tds['prevObject'];

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

function editStuInfor(e) {
    if (!e.target.classList.contains('stu-btn')) {
        return;
    }

    var tableBtn = e.target;

    var tds = $(tableBtn).closest("tr").find('td');

    var editForm = $(tds['10'].firstChild.nextSibling);

    var input1 = $("<input />", {
        name: "hoten",
        value: tds['2'].innerHTML.trim(),
        type: "hidden"
    });

    var input2 = $("<input />", {
        name: "ngaysinh",
        value: tds['3'].innerHTML.trim(),
        type: "hidden"
    });

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

    var input6 = $("<input />", {
        name: "sdtphuhuynh",
        value: tds['7'].innerHTML.trim(),
        type: "hidden"
    });

    var input7 = $("<input />", {
        name: "diachi",
        value: tds['8'].innerHTML.trim(),
        type: "hidden"
    });

    editForm.empty()

    editForm.append(input1, input2, input3, input4, input5, input6, input7);
    console.log(editForm.html())
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
    var a = document.getElementById('malopdangxem').value;
    localStorage.setItem("myselect", a)

    $('.class-list').val(localStorage.getItem("myselect"))
}

$('#logout').click(function () {
    $(".class-list").val($(".class-list option:first"));
    localStorage.removeItem("myselect");
})