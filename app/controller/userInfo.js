const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Covan = db.Covan;

//
const getUserInfo = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
   
    let userInfo = '';
    if(userRole == 'sinhvien'){
        userInfo = await Sinhvien.findByPk(username);
    }else if(userRole == 'covan'){
        userInfo = await Covan.findByPk(username);
    }
   
    res.render('my', userInfo.dataValues);
}

const changeUserInfo = '';

const user ={
    getUserInfo: getUserInfo,
}

module.exports = user;