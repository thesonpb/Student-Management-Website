const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Covan = db.Covan;


//************************************************************************************************************************
//Lấy profile người dùng của sinh viên hoặc cố vấn
const getProfile = async (req, res) => {
    //Lấy tên đăng nhập và vai trò từ biến local tạo ra khi đăng nhập
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;

    console.log(userRole);
    let profile = '';
    //Lấy profile rồi gán vào object profile
    if(userRole == 'sinhvien'){
        profile = await Sinhvien.findByPk(username);
    }else if(userRole == 'covan'){
        profile = await Covan.findByPk(username);
    }
    console.log(profile.dataValues);
    //Render giao diện profile kèm dữ liệu
    res.render('profile', profile.dataValues);
}

const changeUserInfo = async(req, res) => {


};



const user ={
    getProfile: getProfile,
    changeUserInfo: changeUserInfo,
}

module.exports = user;