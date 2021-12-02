const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;

const editStudentInfo = async (req, res) => {
    const stu = await Sinhvien.findByPk(req.params.mssv);
    stu.hoten = req.body.hoten;
    stu.ngaysinh = req.body.ngaysinh;
    stu.malop = req.body.malop;
    stu.email = req.body.email;
    stu.sdt = req.body.sdt;
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