const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;

//
const getUserInfo = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    console.log(userRole);
    let userInfo = '';
    if(userRole == 'sinhvien'){
        userInfo = await Sinhvien.findByPk(username);
    }else if(userRole == 'covan'){
        userInfo = await Covan.findByPk(username);
    }
    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", userInfo.dataValues);
    const sinhviens = await Sinhvien.findAll({
        where: {malop: userInfo.dataValues.malop},
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt'], 
        raw: true
    });
    const diemsinhvien = await Bangdiem.findAll({
        where: {malop: userInfo.dataValues.malop},
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'tinchi', 'gpa', 'canhbaohocvu'],
        raw: true
    });
    // const diemrenluyen = await Diemrenluyen.findAll({
    //     where: {mssv: diemsinhvien.mssv},
    //     attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'tinchi', 'gpa', 'canhbaohocvu'],
    //     raw: true
    // });
    userInfo.dataValues.sinhvien = sinhviens;
    userInfo.dataValues.diemSinhVien = diemsinhvien;
    res.render('my', userInfo.dataValues);
}

const changeUserInfo = '';

const user ={
    getUserInfo: getUserInfo,
}

module.exports = user;