const db = require("../models/index");
const Sinhvien = db.Sinhvien;


const addStudent = async (req, res) => {
    var emailcovan = req.params.email;
    var malopcu = req.params.malop;
    var mssv = (req.body.mssv);
    var hoten = (req.body.hoten);
    var ngaysinh = (req.body.ngaysinh);
    var malop = (req.body.malop);
    var email = (req.body.email);
    var sdt = (req.body.sdt);
    var sdtphuhuynh = (req.body.sdt);
    var diachi = (req.body.sdt);
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
    }).then(function (Sinhvien) {
        if (Sinhvien) {
            res.redirect(`/myclass/${emailcovan}/${malopcu}`);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
};

const user ={
    addStudent: addStudent,
}

module.exports = user;