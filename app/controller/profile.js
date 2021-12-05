const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Covan = db.Covan;
const Bangdiem = db.Bangdiem;
const { QueryTypes, Sequelize } = require('sequelize');



//************************************************************************************************************************
const getProfile = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;

    let profile = '';

    profile = await Sinhvien.findByPk(username);
    const sinhviens = await Sinhvien.findAll({
        where: { malop: profile.malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
    });
    const tongtinchi = await Bangdiem.sum('tinchi', { where: { mssv: username } });
    const tonggpa = await Bangdiem.findAll({
        where: { mssv: username },
        attributes: [[Sequelize.literal('SUM(gpa * tinchi)'), 'result']]
    });
    const ngaysinhchuan = await Sinhvien.findOne({
        where: { mssv: username },
        attributes: ['ngaysinh']
    });

    profile.dataValues.ngaysinh = ngaysinhchuan.ngaysinh;
    profile.dataValues.gpa = (Math.round(tonggpa[0].dataValues.result / tongtinchi * 100) / 100).toFixed(2);
    profile.dataValues.tinchi = tongtinchi;
    profile.dataValues.vaitro = userRole;
    profile.dataValues.sinhvien = sinhviens;
    res.render('profile', profile.dataValues);
}
const getProfileCovan = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    const malop = req.params.malop;

    let profile = '';

    profile = await Covan.findByPk(username);
    const sinhviens = await Sinhvien.findAll({
        where: { malop: malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
    });
    const ngaysinhchuan = await Covan.findOne({
        where: { email: username },
        attributes: ['ngaysinh']
    });

    profile.dataValues.ngaysinh = ngaysinhchuan.ngaysinh;
    profile.dataValues.vaitro = userRole;
    profile.dataValues.sinhvien = sinhviens;
    res.render('profile', profile.dataValues);
}

const updateUserInfo = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    const avatarPath = '/assets/img/avatar/' + req.file.filename;


    if (userRole == 'sinhvien') {
        studentProfile = await Sinhvien.findByPk(username);
        await studentProfile.update({
            hoten: req.body.hoten,
            email: req.body.email,
            ngaysinh: req.body.ngaysinh,
            sdt: req.body.sdt,
            //avatar: avatarPath
        });
        await studentProfile.save();
    } else if (userRole == 'covan') {
        advisorProfile = await Covan.findByPk(username);
        await advisorProfile.update({
            hoten: req.body.hoten,
            //email: req.body.email,
            ngaysinh: req.body.ngaysinh,
            sdt: req.body.sdt,
            //avatar: avatarPath
        });
        await advisorProfile.save();
    }
};


const uploadAvatar = async (req, res) => {

    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    let avatarPath = '/assets/img/avatar/' + req.file.filename;

    //Lưu ảnh vào db
    if (userRole == 'sinhvien') {
        profile = await Sinhvien.findByPk(username);
    } else if (userRole == 'covan') {
        profile = await Covan.findByPk(username);
    }
    await profile.update({ avatar: avatarPath });
    await profile.save();

    res.redirect('/profile');
}

const viewStudentProfile = async (req, res) => {
    let profile = '';
    profile = await Sinhvien.findByPk(req.params.mssv);
    const sinhviens = await Sinhvien.findAll({
        where: { mssv: req.params.mssv },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
    });
    const ngaysinhchuan = await Sinhvien.findOne({
        where: { mssv: req.params.mssv },
        attributes: ['ngaysinh']
    });

    profile.dataValues.ngaysinh = ngaysinhchuan.ngaysinh;
    profile.dataValues.vaitro = 'sinhvien';
    profile.dataValues.sinhvien = sinhviens;
    res.render('profile', profile.dataValues);
}



const user = {
    getProfile: getProfile,
    updateUserInfo: updateUserInfo,
    uploadAvatar: uploadAvatar,
    getProfileCovan: getProfileCovan,
    viewStudentProfile: viewStudentProfile,
}

module.exports = user;