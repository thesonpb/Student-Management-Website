const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const Lophoc = db.Lophoc;
const { QueryTypes, Sequelize } = require('sequelize');

//
const teacherInfo = async (req, res) => {
    // const username = res.locals.user.tennguoidung;
    const username = req.body.emailcovan;
    let userInfo = '';
    let malop = req.body.class;
    const classId = await Lophoc.findAll({
        where: { emailcovan: username },
        attributes: ['malop'],
        raw: true
    });
    userInfo = await Covan.findByPk(username);
    userInfo.dataValues.role = 'covan';
    const sinhviens = await Sinhvien.findAll({
        where: { malop: malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt'],
        raw: true
    });

    const diemsinhvien = await Bangdiem.findAll({
        where: { malop: malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'tinchi', 'gpa', 'canhbaohocvu', 'namhoc', 'hocky'],
        raw: true
    });
    const drl = await Sinhvien.findAll({
        where: { malop: malop },
        include: [
            {
                model: Diemrenluyen,
                where: {
                    mssv: Sequelize.col('sinhvien.mssv')
                },

                required: false
            }
        ],
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
    });
    
    userInfo.dataValues.sinhvien = sinhviens;
    userInfo.dataValues.diemSinhVien = diemsinhvien;
    userInfo.dataValues.diemRenLuyen = drl;
    userInfo.dataValues.classId = classId;
    userInfo.dataValues.username = username;
    res.render('my', userInfo.dataValues);
}

const changeUserInfo = '';

const user = {
    teacherInfo: teacherInfo,
}

module.exports = user;