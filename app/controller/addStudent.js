// const db = require("../models/index");
// const Sinhvien = db.Sinhvien;


// exports.addStudent = async (req, res) => {
//     console.log("creating objecttttttttttttttttt");
//     var mssv = JSON.stringify(req.body.mssv);
//     var hoten = JSON.stringify(req.body.hoten);
//     var ngaysinh = JSON.stringify(req.body.ngaysinh);
//     await Sinhvien.create({
//         mssv: mssv, 
//         hoten: hoten,
//         email: "n/a", 
//         ngaysinh: ngaysinh,
//         sdt: 0,
//         khoa: "n/a",
//         gpa: 0.0,
//         tinchi: 0,
//         malop: "n/a",
//         avatar: "",
//         canhbaohocvu: "n/a"
//     }).then(function (Sinhvien) {
//         if (Sinhvien) {
//             res.send(Sinhvien);
//         } else {
//             res.status(400).send('Error in insert new record');
//         }
//     });
// };