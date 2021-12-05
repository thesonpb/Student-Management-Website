const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Taikhoan = db.Taikhoan;


const addStudent = async (req, res) => {
    var emailcovan = req.params.email;
    var malopcu = req.params.malop;
    var mssv = (req.body.mssv);
    var hoten = (req.body.hoten);
    var ngaysinh = (req.body.ngaysinh);
    var malop = (req.body.malop);
    var email = (req.body.email);
    var sdt = (req.body.sdt);
    var sdtphuhuynh = (req.body.sdtphuhuynh);
    var diachi = (req.body.diachi);
    try {
        await Sinhvien.create({
            mssv: mssv,
            hoten: hoten,
            email: email,
            ngaysinh: ngaysinh,
            sdt: sdt,
            khoa: "",
            malop: malop,
            avatar: "",
            sdtphuhuynh: sdtphuhuynh,
            diachi: diachi
        });
    } catch (err) {
        console.log(err);
    }
    try {
        await Bangdiem.create({
            malop: malop,
            hocky: "",
            mssv: mssv,
            tinchi: 0,
            gpa: 0.0,
            canhbaohocvu: ""
        });
    } catch (err) {
        console.log(err);
    }
    try {
        await Diemrenluyen.create({
            mssv: mssv,
            ythuc: 0,
            noiquy: 0,
            hoatdong: 0,
            phamchat: 0,
            phutrachlop: 0,
            hocky: ""
        });
    } catch (err) {
        console.log(err);
    }
    try {
        await Taikhoan.create({
            tennguoidung: mssv,
            matkhau: "1",
            vaitro: "sinhvien"
        });
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/myclass/${emailcovan}/${malopcu}`);
};

const user = {
    addStudent: addStudent,
}

module.exports = user;