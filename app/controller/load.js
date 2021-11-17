const db = require("../models/index");
const bodyParser = require("body-parser");
const Sinhvien = db.sinhvien;
const Lophoc = db.lophoc;


exports.userinfo = async (req, res) => {
    // const userRole = res.locals.user.vaitro;
    // if (userRole == 'sinhvien') {
    //     const malop = res.locals.user.malop;
    // } 
    // else if (userRole == 'covan') {
    //     const danhsachmalop = await Lophoc.findAll({
    //         where: {
    //             emailcovan: res.local.user.tennguoidung
    //         },
    //         attributes: ['malop'],
    //         raw: true
    //     });
    // }
    const sinhviens = await Sinhvien.findAll({
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop'], 
        raw: true
    });
    res.render('my', {
        sinhvien: sinhviens,
        name: "Nguyen The Son",
        avatar: "../assets/img/cat.jpg",
        numberOfStudent: '40',
        avatar1: "../assets/img/cat.jpg",
        name1: "Nguyen Van A",
        position1: "Sinh vien",
        avatar2: "../assets/img/cat.jpg",
        name2: "Nguyen Van B",
        position2: "Sinh vien",
        avatar3: "../assets/img/cat.jpg",
        name3: "Nguyen Van C",
        position3: "Sinh vien",
        avatar4: "../assets/img/cat.jpg",
        name4: "Nguyen Van D",
        position4: "Lop truong",
        todo_title: "Do Homework",
        todo_content: "Do ex1, ex2...",
        todo_open: "30/10/2021",
        todo_due: "13/11/2021",
        author_avt: "../assets/img/cat.jpg",
        author_name: "Nguyen Thi Chiu",
        post_time: "10:30 - 30/10/2021",
        question_title1: "[Q] Hoi ve X", 
        question_content1: "Cac ban nhan vien ho tro minh voi",
    });
};