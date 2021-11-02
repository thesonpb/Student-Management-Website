const db = require("../models/index");
const Student = db.sinhvien;
const Lecturer = db.covan;


const getProfile = async (req, res) => {
    const username = res.locals.user.username;
    const userRole = res.locals.user.role;
    console.log(userRole);
    let profile = '';
    if(userRole == 'student'){
        profile = await Student.findByPk(username);
    }else if(role == 'lectuerer'){
        profile = await Lecturer.findByPk(username);
    }
    console.log(profile.dataValues);
    res.render('profile', profile.dataValues);
}

const changeUserInfo = '';



const user ={
    getProfile: getProfile,
}

module.exports = user;