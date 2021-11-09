const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const db = require('../models/index');
const User = db.user;

const verifyToken = (req, res, next) => {
    const token = req.cookies.jwt;
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


const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, config.secretKey, async (err, decoded) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            }else{
                console.log(decoded);
                const user = await User.findOne({
                    where: {
                      username: decoded.id
                    }
                });
                res.locals.user = user.dataValues;
                console.log(user.dataValues);
                next();
            }
        });
    }else{
        res.locals.user = null;
        next();
    }
};


const authJWT = {
    verifyToken: verifyToken,
    checkUser: checkUser,
};

module.exports = authJWT;