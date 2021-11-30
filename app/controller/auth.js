const db = require("../models/index");
const config = require("../config/auth");
const Taikhoan = db.Taikhoan;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//************************************************************************************************************************
// Login:
// Tìm tên đăng nhập trên CSDl, nếu tìm thấy 
// so sánh mật khẩu với mk trong db, nếu trùng nhau
// tạo ra 1 token dùng jsonwebtoken
// trả về thông tin người dùng và access Token
const login = async (req, res) => {

    console.log(JSON.stringify(req.body));

    //Truy vấn tên người dùng
    await Taikhoan.findOne({
        where: {
            tennguoidung: req.body.username
        }
    })
    //Truy vấn trả về đối tượng user
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "Không tìm thấy người dùng!" });
        }
        //So sánh mật khẩu
        // var passwordIsValid = bcrypt.compareSync(
        //     req.body.password,
        //     user.password
        // );
        //De tam so sánh mk với mk trong db chứ chưa mã hoá
        if (req.body.password != user.matkhau) {
            return res.status(402).json({
                accessToken: null,
                message: "Sai mật khẩu"
            });
        }
        //************************************************************************************************************************
        //Tạo token hết hạn trong 1h
        const maxAge = 1*60*60;
        let token = jwt.sign({ id: user.tennguoidung }, config.secretKey, {
            expiresIn: maxAge, // 1 hours
        });

        //************************************************************************************************************************
        //Tạo cookie lưu vào biến local của trình duyệt
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });

        //************************************************************************************************************************
        //response trả về khi tìm thấy người dùng
        return res.status(200).json({
            username: user.tennguoidung,
            role: user.vaitro,
            accessToken: token,
        });

    })
    //************************************************************************************************************************
    //Bắt lỗi
    .catch(err => {
        res.status(500).json({ message: err.message });
    });

};



//*****************************************************************************************************************************
//Logout: Xoá jwt, điều hướng người dùng về trang đăng nhập
const logout = (req, res) => {
    res.cookie('jwt', '', { maxAge:1, });
    res.redirect('/');
}

//Đóng gói 2 phương pháp login và logout
const auth = {
    login: login,
    logout: logout,
};

module.exports = auth;