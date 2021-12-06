const db = require("../models/index");
const Sinhvien = db.Sinhvien;

const studentEditProfile = async (req, res) => {
    const stu = await Sinhvien.findByPk(req.params.mssv);
    stu.hoten = req.body.hoten;
    stu.email = req.body.email;
    stu.sdt = req.body.sdt;
    await stu.save();
    //res.redirect('/profile');
    return res.status(200).json({
        message: "success!"
    });
}

const user = {
    studentEditProfile: studentEditProfile,
}

module.exports = user;