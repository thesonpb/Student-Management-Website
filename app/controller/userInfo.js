const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const Lophoc = db.Lophoc;
const { QueryTypes, Sequelize } = require('sequelize');

//
const getUserInfo = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    let sinhviens = null;
    let drl = null;
    let diemsinhvien = null;
    let classId = null;
    let userInfo = '';
    let malop = '';

    if (userRole == 'sinhvien') {
        userInfo = await Sinhvien.findByPk(username);
        userInfo.dataValues.role = 'sinhvien';
        malop = userInfo.dataValues.malop;
    } else if (userRole == 'covan') {
        userInfo = await Covan.findByPk(username);
        userInfo.dataValues.role = 'covan';
        classId = await Lophoc.findAll({
            where: { emailcovan: username },
            attributes: ['malop'],
            raw: true
        });
        malop = classId[0].malop;

    }
    sinhviens = await Sinhvien.findAll({
        where: { malop: malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt'],
        raw: true
    });

    diemsinhvien = await Bangdiem.findAll({
        where: { malop: malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'tinchi', 'gpa', 'canhbaohocvu', 'namhoc', 'hocky'],
        raw: true
    });
    drl = await Sinhvien.findAll({
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
    getUserInfo: getUserInfo,
}

module.exports = user;