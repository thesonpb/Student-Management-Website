$(`li[data-rel="${1}"]`).addClass('active')

var editionMode = false;
var stdTable = $('#student-table');
var tbody = $('.stu-table-body')
$('#warning').val('');

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
        editTableBtn.hide('fast');
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
            editionMode = false;
        } else {
            td.style.opacity = '0.5';
            td.value = "Save";
            editionMode = true
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
    editForm.submit();
};

stdTable.click(openProfile);


function openProfile(e) {
    var tableBtn = e.target;
    var tds = $(tableBtn).closest("tr").find('td');
    const profileForm = tds[0].firstChild.nextSibling;
    for(var i = 0; i < 9; i++) {
        if(e.target === tds[i] && !editionMode) {
                profileForm.submit();
            }
        }
}

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

const mssvWarning = document.getElementById('mssv-warning')
const add_stu = document.querySelector('add-stu');
    $('#add-stud').submit = ( async (e) => {
        e.preventDefault();
        if(validate()){
            const mssv = add_stu.mssv.value;
            const hoten = add_stu.hoten.value;
            const ngaysinh = add_stu.ngaysinh.value;
            const malop = add_stu.malop.value;
            const email = add_stu.email.value;
            const sdt = add_stu.sdt.value;
            const sdtphuhuynh = add_stu.sdtphuhuynh.value;
            const diachi = add_stu.diachi.value;
        
            const emailcovan = document.getElementById('emaildangxem').value;
            const malopdangxem = document.getElementById('malopdangxem').value;
            try{
                const res = await fetch(`/add/student/${emailcovan}/${malopdangxem}`, {
                    method: 'POST',
                    body: JSON.stringify({mssv, hoten, ngaysinh, malop, email, sdt, sdtphuhuynh, diachi}),
                    headers: {'Content-Type': 'application/json'}
                });
                const data = await res.json();
                if(data.message){
                    mssvWarning.innerHTML = data.message;
                    mssvWarning.style.display = "block";
                }
            }catch(e){
                console.log(e);
            }
        }
    })

// $('#add-class').submit( async e =>{
//     const malop = $('#class-id').val();
//     if(malop){
//         try{
//             const res = await fetch('/add/class', {
//                 method: 'POST',
//                 body: JSON.stringify({username, password}),
//                 headers: {'Content-Type': 'application/json'}
//             });
//             const data = await res.json();
//             if(data.username){
//                 location.assign('/my');
//             }else{
//                 passwordWarning.innerHTML = data.message;
//                 passwordWarning.style.display = "block";
//             }
//         }catch(e){
//             console.log(e);
//         }
//     }

    
// })



// $('#add-class').submit( async (e) => {
//     e.preventDefault();

//     const malop = $('#class-id').val();
//     const classListFile = document.querySelector('#classListFile');

//     let formData = new FormData();
//     formData.append('malop', malop);
//     formData.append('classList', classListFile.files[0]);
//     console.log('here')

//     try{
//         const res = await fetch('/add/class', {
//             method: 'POST',
//             body: formData,
//         });
        
//     }catch(e){
//         console.log(e);
//     }


// })