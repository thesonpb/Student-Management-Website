const db = require("../models/index");
const Thongbao = db.Thongbao;


exports.uploadTask = async (req, res) => {
    var malop = req.body.malop;
    var email = req.body.email;
    var guiden = req.body.mssv;
    var tieude = req.body.subject;
    var noidung = req.body.content;
    var thoigian = Date.now();
    console.log(req.body)
    if (guiden == "all") {
        try {
            await Thongbao.create({
                malop: malop,
                emailcovan: email,
                calop: guiden,
                mssv: null,
                tieude: tieude,
                noidung: noidung,
                thoigian: thoigian
            });
        } catch (err) {
            console.log(err);
        }
    }
    else {
        try {
            await Thongbao.create({
                malop: malop,
                emailcovan: email,
                calop: 'no',
                mssv: guiden,
                tieude: tieude,
                noidung: noidung,
                thoigian: thoigian
            });
        } catch (err) {
            console.log(err);
        }
    }
    res.redirect(`/thong-bao/${malop}`);
};