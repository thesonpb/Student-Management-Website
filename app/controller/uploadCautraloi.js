const db = require("../models/index");
const Cautraloi = db.Cautraloi;
const { QueryTypes, Sequelize } = require('sequelize');

const uploadCautraloi = async (req, res) => {
    var subject = JSON.stringify(req.body.subject);
    var content = JSON.stringify(req.body.content);
    var hoten = req.params.hoten;
    let time = Date.now();

    await Cautraloi.create({
        malop: 'k64caclc2',
        nguoihoi: hoten,
        tieude: subject,
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