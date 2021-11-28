const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const { QueryTypes, Sequelize } = require('sequelize');


const hoctap = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    console.log(userRole);
    let userInfo = '';
    if (userRole == 'sinhvien') {
        userInfo = await Sinhvien.findByPk(username);
    } else if (userRole == 'covan') {
        userInfo = await Covan.findByPk(username);
    }
    const diemsinhvien = await Bangdiem.findAll({
        where: { malop: userInfo.dataValues.malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'tinchi', 'gpa', 'canhbaohocvu'],
        raw: true
    });
    let sinhvien = null;
    let diemRenLuyen = null;
    userInfo.dataValues.diemSinhVien = diemsinhvien;
    userInfo.dataValues.sinhvien = sinhvien;
    userInfo.dataValues.diemRenLuyen = diemRenLuyen;
    res.render('my', userInfo.dataValues);
}


const user ={
    hoctap: hoctap,
}

module.exports = user;