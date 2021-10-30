const jwt = require('jsonwebtoken');
const config = require('../config/auth');
const db = require('../models/index');

verifyToken = (req, res, next) => {
    let token = req.headers['x-access-token'];

    if(!token){
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    try{
        const decoded = jwt.verify(token, config.secretKey);
        req.nguoidung = decoded;
    }catch(e){
        return res.status(401).send({
            message: "Unauthorized!"
          });
    }

    // jwt.verify(token, config.secretKey, (err, decoded) => {
    //     if (err) {
    //       return res.status(401).send({
    //         message: "Unauthorized!"
    //       });
    //     }
    //     req.userId = decoded.id;
    //     next();
    // });
}

const authJWT = {
    verifyToken: verifyToken,
};

module.exports = authJWT;