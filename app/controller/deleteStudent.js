const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Taikhoan = db.Taikhoan;

const deleteStudent = async (req, res) => {
    await Bangdiem.destroy({ where: { mssv: req.params.mssv } });
    await Diemrenluyen.destroy({ where: { mssv: req.params.mssv } });
    const stu = await Sinhvien.findByPk(req.params.mssv);
    await stu.destroy();
    const acc = await Taikhoan.findByPk(req.params.mssv);
    await acc.destroy();

    res.redirect('/my');
}

const user = {
    deleteStudent: deleteStudent,
}

module.exports = user;