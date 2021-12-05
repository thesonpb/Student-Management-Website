const db = require("../models/index");
const Cautraloi = db.Cautraloi;
const { QueryTypes, Sequelize } = require('sequelize');

const uploadAnswer = async (req, res) => {
    const macauhoi = req.params.macauhoi;
    const nguoitraloi = req.params.hoten;
    const malop = req.params.malop;
    const noidung = req.body.content;
    const thoigian = Date.now();
    try {
        await Cautraloi.create({
            macauhoi: macauhoi,
            nguoitraloi: nguoitraloi,
            noidung: noidung,
            thoigian: thoigian
        });
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/dien-dan/${malop}`);
}


const user = {
    uploadAnswer: uploadAnswer,
}

module.exports = user;