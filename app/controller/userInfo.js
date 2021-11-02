const db = require("../models/index");
const Student = db.sinhvien;
const Lecturer = db.covan;


const getUserInfo = async (req, res) => {
    const username = res.locals.user.username;
    const userRole = res.locals.user.role;
    console.log(userRole);
    let userInfo = '';
    if(userRole == 'student'){
        userInfo = await Student.findByPk(username);
    }else if(role == 'lectuerer'){
        userInfo = await Lecturer.findByPk(username);
    }
    console.log(userInfo.dataValues);
    res.render('my', userInfo.dataValues);
}

const changeUserInfo = '';

const user ={
    getUserInfo: getUserInfo,
}

module.exports = user;