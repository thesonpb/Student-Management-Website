const db = require("../models/index");
const Cautraloi = db.Cautraloi;
const { QueryTypes, Sequelize } = require('sequelize');

const uploadCautraloi = async (req, res) => {
    var content = JSON.stringify(req.body.answer);
    var hoten = req.params.hoten;
    let time = Date.now();

    await Cautraloi.create({
        macauhoi: 1,
        mssv: 1000,
        emailcovan: 'subject',
        noidung: content,
        thoigian: time
    }).then(function (Cautraloi) {
        if (Cautraloi) {
            res.send(Cautraloi);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });

}

module.exports = uploadCautraloi;