// const db = require("../models/index");
// const bodyParser = require("body-parser");
// const Sinhvien = db.sinhvien;


// exports.addStudent = async (req, res) => {
//     var mssv = JSON.stringify(req.body.mssv);
//     var hoten = JSON.stringify(req.body.hoten);
//     await Sinhvien.create({
//         mssv: mssv, 
//         hoten: hoten,
//         email: "", 
//         ngaysinh: "",
//         sdt: 0,
//         khoa: "",
//         gpa: 0.0,
//         tinchi: 0,
//         malop: "",
//         avatar: "",
//         canhbaohocvu: ""
//     }).then(function (Sinhvien) {
//         if (Sinhvien) {
//             res.send(Sinhvien);
//         } else {
//             res.status(400).send('Error in insert new record');
//         }
//     });
// };