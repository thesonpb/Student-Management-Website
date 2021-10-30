const db = require("../models/index");
const config = require("../config/auth");
const User = db.user;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

// Login:
// Tìm tên đăng nhập trên CSDl, nếu tìm thấy 
// so sánh mật khẩu với mk trong db, nếu trùng nhau
// tạo ra 1 token dùng jsonwebtoken
// trả về thông tin người dùng và access Token
exports.login = async (req, res) => {

    console.log(JSON.stringify(req.body));

    //Truy vấn tên người dùng
    await User.findOne({
    where: {
      username: req.body.username
    }
  })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "Không tìm thấy người dùng!" });
        }
        //So sánh mật khẩu
        // var passwordIsValid = bcrypt.compareSync(
        //     req.body.password,
        //     user.password
        // );
        //De tam
        if (req.body.password != user.password) {
            return res.status(402).json({
                accessToken: null,
                message: "Sai mật khẩu"
            });
        }

        //Tạo token hết hạn trong 1h
        const maxAge = 1*60*60;
        let token = jwt.sign({ id: user.username }, config.secretKey, {
            expiresIn: maxAge, // 1 hours
            //noTimestamp:true,
        });
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
        res.status(200).json({
            username: user.username,
            role: user.role,
            accessToken: token,
        });

    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};