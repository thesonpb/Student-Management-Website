const db = require("../models/index");
const config = require("../config/auth");
const Nguoidung = db.nguoidung;
const Vaitro = db.vaitro;

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
    await Nguoidung.findOne({
    where: {
      tennguoidung: req.body.username
    }
  })
    .then(nguoidung => {
        if (!nguoidung) {
            return res.status(404).send({ message: "Không tìm thấy người dùng!" });
        }
        //So sánh mật khẩu
        // var passwordIsValid = bcrypt.compareSync(
        //     req.body.password,
        //     user.password
        // );
        //De tam
        if (req.body.password != nguoidung.matkhau) {
            return res.status(402).json({
                accessToken: null,
                message: "Sai mật khẩu"
            });
        }

        //Tạo token hết hạn trong 1h
        var token = jwt.sign({ id: nguoidung.id }, config.secretKey, {
            expiresIn: 3600 // 1 hours
        });
        //res.cookie('jwt', token, {httpOnly: true, maxAge: 3600});
        
        res.status(200).json({
            username: nguoidung.tennguoidung,
            role: nguoidung.vaitro,
            accessToken: token,
        });

    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
};