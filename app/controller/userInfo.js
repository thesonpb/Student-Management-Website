const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const Lophoc = db.Lophoc;
const Admin = db.Admin;
const { QueryTypes, Sequelize } = require('sequelize');
const lophoc = require("../models/lophoc");

//
const getUserInfo = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    let sinhviens = null;
    let drl = null;
    let diemsinhvien = null;
    let classId = null;
    let lophoc = null;
    let userInfo = '';
    let covan = '';
    let malop = '';
    if (userRole == 'admin') {
        userInfo = await Admin.findByPk(username);
        userInfo.dataValues.vaitro = 'admin';
        sinhviens = await Sinhvien.findAll({
            attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt']
        });
        lophoc = await Lophoc.findAll();
        covan = await Covan.findAll();
        userInfo.dataValues.sinhvien = sinhviens;
        userInfo.dataValues.lophoc = lophoc;
        userInfo.dataValues.covan = covan;
        res.render('admin', userInfo.dataValues);
    }
    else if (userRole == 'sinhvien') {
        userInfo = await Sinhvien.findByPk(username);
        userInfo.dataValues.vaitro = 'sinhvien';
        malop = userInfo.dataValues.malop;
        sinhviens = await Sinhvien.findAll({
            where: { malop: malop },
            attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
        });

        userInfo.dataValues.sinhvien = sinhviens;
        userInfo.dataValues.classId = classId;
        userInfo.dataValues.username = username;
        
    
        res.redirect(`hoc-tap/${malop}`);
    } else if (userRole == 'covan') {
        userInfo = await Covan.findByPk(username);
        userInfo.dataValues.vaitro = 'covan';
        classId = await Lophoc.findAll({
            where: { emailcovan: username },
            attributes: ['malop'],
        });
        malop = classId[0].malop;
        res.redirect(`/myclass/${username}/${malop}`);
    }

}

const changeUserInfo = '';

const user = {
    getUserInfo: getUserInfo,
}

module.exports = user;