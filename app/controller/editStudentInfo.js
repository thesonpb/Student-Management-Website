const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;

const editStudentInfo = async (req, res) => {
    const stu = await Sinhvien.findByPk(req.params.mssv);
    stu.hoten = req.body.hoten;
    var from = (req.body.ngaysinh).split("/");
    var dd = (parseInt(from[0]) + 1).toString();
    var f = new Date(from[2], from[1] - 1, dd);
    stu.ngaysinh = f;
    stu.malop = req.body.malop;
    stu.email = req.body.email;
    stu.sdt = req.body.sdt;
    stu.sdtphuhuynh = req.body.sdtphuhuynh;
    stu.diachi = req.body.diachi;
    await stu.save();

    await Bangdiem.update({
        malop: req.body.malop
    }, 
    {
        where: {mssv: req.params.mssv}
    })
    res.redirect(`/myclass/${req.params.email}/${req.params.malop}`);
}

const user = {
    editStudentInfo: editStudentInfo,
}

module.exports = user;