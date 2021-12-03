const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;

const editStudentInfo = async (req, res) => {
    const stu = await Sinhvien.findByPk(req.params.mssv);
    stu.hoten = req.body.hoten;
    var d = new Date(req.body.ngaysinh),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    stu.ngaysinh = [year, month, day].join('/');
    console.log([year, month, day].join('/'));
    stu.malop = req.body.malop;
    stu.email = req.body.email;
    stu.sdt = req.body.sdt;
    await stu.save();

    await Bangdiem.update({
        malop: req.body.malop
    },
        {
            where: { mssv: req.params.mssv }
        })
    res.redirect(`/myclass/${req.params.email}/${req.params.malop}`);
}

const user = {
    editStudentInfo: editStudentInfo,
}

module.exports = user;