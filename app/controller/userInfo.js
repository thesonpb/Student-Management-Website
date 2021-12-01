const db = require("../models/index");
const Sinhvien = db.sinhvien;
const Covan = db.covan;


//
const getUserInfo = async (req, res) => {
    const tennguoidung = res.locals.user.tennguoidung;
    const vaitro = res.locals.user.vaitro;
    console.log('ten nguoi dung: ', tennguoidung);
    console.log('vaitro: vaitro');
    let thongtin = '';
    if(vaitro == 'sinhvien'){
        thongtin = await Sinhvien.findByPk(tennguoidung);
    }else if(vaitro == 'covan'){
        thongtin = await Covan.findByPk(tennguoidung);
    }
    console.log(thongtin.dataValues);
}

const changeUserInfo = '';

const user ={
    getUserInfo: getUserInfo,
}

module.exports = user;