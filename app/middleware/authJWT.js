const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const db = require('../models/index');
const Taikhoan = db.Taikhoan;
let role= '';

//************************************************************************************************************************
//Kiểm tra xem người dùng còn phiên đăng nhập không
const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
    //Kiểm tra token
    if(token){
        jwt.verify(token, config.secretKey, (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.redirect('/');
            }else{
                console.log(decoded);
                next();
            }
        
        });
    }else{
        res.redirect('/');
    }
};

//************************************************************************************************************************
//Kiểm tra người dùng rồi gán thông tin cơ bản gồm username và role vào 1 biến local tồn tại đến khi đăng xuất
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log('------------------------------Check-----------------------------------------')
    if(token){
        jwt.verify(token, config.secretKey, async (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                //res.locals.profile = null;
                next();
            }else{
                console.log(decoded)
                const user = await Taikhoan.findOne({
                    where: {
                      tennguoidung: decoded.id
                    }
                });
                //Gán đối tượng user truy vấn được vào biến local tên là user
                res.locals.user = user.dataValues;
                role = user.dataValues.vaitro;
                next();
            }
        });
    }else{
        res.locals.user = null;
        //res.locals.profile = null;
        next();
    }
};

const isStudent = (req, res, next) => {
    if(role == 'sinhvien'){
        next();
    }else{
        res.status(403).render('403');
    }
}

const isAdvisor = (req, res, next) => {
    if(role == 'covan'){
        next();
    }else{
        res.status(403).render('403');
    }
}

const isAdmin = (req, res, next) => {
    if(role == 'admin'){
        next();
    }else{
        res.status(403).render('403');
    }
}

const authJWT = {
    verifyToken: verifyToken,
    checkUser: checkUser,
    isStudent: isStudent,
    isAdvisor: isAdvisor,
    isAdmin: isAdmin,
};

module.exports = authJWT;