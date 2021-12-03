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
    await Sinhvien.create({
        mssv: mssv, 
        hoten: hoten,
        email: email, 
        ngaysinh: ngaysinh,
        sdt: sdt,
        khoa: "",
        gpa: 0.0,
        tinchi: 0,
        malop: malop,
        avatar: "",
        canhbaohocvu: "", 
        sdtphuhuynh: "", 
        diachi: ""
    });
    await Bangdiem.create({
        malop: malop,
        hocky: "", 
        mssv: mssv, 
        tinchi: 0, 
        gpa: 0.0, 
        canhbaohocvu: ""
    });
    await Diemrenluyen.create({
        mssv: mssv, 
        ythuc: 0, 
        noiquy: 0, 
        hoatdong: 0, 
        phamchat: 0, 
        phutrachlop: 0, 
        hocky: ""
    });
    await Taikhoan.create({
        tennguoidung: mssv, 
        matkhau: "1", 
        vaitro: "sinhvien"
    });
    res.redirect(`/myclass/${emailcovan}/${malopcu}`);

};

const user ={
    addStudent: addStudent,
}

module.exports = user;