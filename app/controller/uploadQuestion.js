const db = require("../models/index");
const Cauhoi = db.Cauhoi;
const { QueryTypes, Sequelize } = require('sequelize');

const uploadQuestion = async (req, res) => {
    const malop = req.params.malop;
    const hoten = req.params.hoten;
    const tieude = req.body.subject;
    const noidung = req.body.content;
    const thoigian = Date.now();
    try {
        await Cauhoi.create({
            malop: malop,
            nguoihoi: hoten,
            tieude: tieude,
            noidung: noidung,
            thoigian: thoigian
        });
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/dien-dan/${malop}`);
}


const user = {
    uploadQuestion: uploadQuestion,
}

module.exports = user;