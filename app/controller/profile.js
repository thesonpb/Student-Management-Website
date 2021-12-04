const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Covan = db.Covan;
const Bangdiem = db.Bangdiem;
const { QueryTypes, Sequelize } = require('sequelize');



//************************************************************************************************************************
//Lấy profile người dùng của sinh viên hoặc cố vấn
const getProfile = async (req, res) => {
    //Lấy tên đăng nhập và vai trò từ biến local tạo ra khi đăng nhập
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;


    console.log(userRole);
    let profile = '';
    //Lấy profile rồi gán vào object profile
    if (userRole == 'sinhvien') {
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
    } else if (userRole == 'covan') {
        profile = await Covan.findByPk(username);
        //TODO: chỗ này cần sửa truy vấn sinh viên, để lắp thông tin về mã lớp vào các nút bấm ở leftsidebar
        //Chưa có mã của lớp đang xem hiện tại truyền cùng yêu cầu
        const sinhviens = await Sinhvien.findAll({
            where: { malop: 'K64CACLC2' },
            attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
        });
        //Render giao diện profile kèm dữ liệu
        const ngaysinhchuan = await Covan.findOne({
            where: { email: username },
            attributes: ['ngaysinh']
        });

        profile.dataValues.ngaysinh = ngaysinhchuan.ngaysinh;
        profile.dataValues.vaitro = userRole;
        profile.dataValues.sinhvien = sinhviens;
        res.render('profile', profile.dataValues);
    }

    //TODO: chỗ này cần sửa truy vấn sinh viên, để lắp thông tin về mã lớp vào các nút bấm ở leftsidebar
    //Chưa có mã của lớp đang xem hiện tại truyền cùng yêu cầu
    const sinhviens = await Sinhvien.findAll({
        where: { malop: 'K64CACLC2' },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
    });
    //Render giao diện profile kèm dữ liệu

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



const user = {
    getProfile: getProfile,
    updateUserInfo: updateUserInfo,
    uploadAvatar: uploadAvatar,
}

module.exports = user;

// const db = require("../models/index");
// const Sinhvien = db.Sinhvien;
// const Bangdiem = db.Bangdiem;
// const Diemrenluyen = db.Diemrenluyen;
// const Covan = db.Covan;
// const Lophoc = db.Lophoc;
// const { QueryTypes, Sequelize } = require('sequelize');


// const profileTeacher = async (req, res) => {
//     const username = res.locals.user.tennguoidung;
//     const userRole = res.locals.user.vaitro;
//     let userInfo = '';
//     userInfo = await Covan.findByPk(username);
//     userInfo.dataValues.vaitro = 'covan';
//     const diemsinhvien = await Sinhvien.findAll({
//         where: { malop: req.params.malop },
//         include: [
//             {
//                 model: Bangdiem,
//                 where: {
//                     mssv: Sequelize.col('sinhvien.mssv')
//                 },

//                 required: false
//             }
//         ],
//         attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
//     });
//     const sinhviens = await Sinhvien.findAll({
//         where: { malop: req.params.malop },
//         attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
//     });
//     const drl = await Sinhvien.findAll({
//         where: { malop: req.params.malop },
//         include: [
//             {
//                 model: Diemrenluyen,
//                 where: {
//                     mssv: Sequelize.col('sinhvien.mssv')
//                 },

//                 required: false
//             }
//         ],
//         attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
//     });
//     const classId = await Lophoc.findAll({
//         where: { emailcovan: username },
//         attributes: ['malop'],
//     });
//     userInfo.dataValues.diemSinhVien = diemsinhvien;
//     userInfo.dataValues.sinhvien = sinhviens;
//     userInfo.dataValues.diemRenLuyen = drl;
//     userInfo.dataValues.classId = classId;
//     res.render('profile', userInfo.dataValues);
// }
// const profileStudent = async (req, res) => {
//     const username = res.locals.user.tennguoidung;
//     const userRole = res.locals.user.vaitro;
//     let userInfo = '';
//     userInfo = await Sinhvien.findByPk(username);
//     userInfo.dataValues.vaitro = 'sinhvien';
//     const diemsinhvien = await Sinhvien.findAll({
//         where: { malop: req.params.malop },
//         include: [
//             {
//                 model: Bangdiem,
//                 where: {
//                     mssv: Sequelize.col('sinhvien.mssv')
//                 },

//                 required: false
//             }
//         ],
//         attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
//     });
//     const sinhviens = await Sinhvien.findAll({
//         where: { malop: req.params.malop },
//         attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
//     });
//     const drl = await Sinhvien.findAll({
//         where: { malop: req.params.malop },
//         include: [
//             {
//                 model: Diemrenluyen,
//                 where: {
//                     mssv: Sequelize.col('sinhvien.mssv')
//                 },

//                 required: false
//             }
//         ],
//         attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
//     });

//     userInfo.dataValues.diemSinhVien = diemsinhvien;
//     userInfo.dataValues.sinhvien = sinhviens;
//     userInfo.dataValues.diemRenLuyen = drl;
//     res.render('profile', userInfo.dataValues);
// }


// const user = {
//     profileTeacher: profileTeacher,
//     profileStudent: profileStudent,
// }

// module.exports = user;

