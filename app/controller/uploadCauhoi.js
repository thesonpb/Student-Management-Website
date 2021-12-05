const db = require("../models/index");
const Cauhoi = db.Cauhoi;
const { QueryTypes, Sequelize } = require('sequelize');

const uploadCauhoi = async (req, res) => {
    var subject = JSON.stringify(req.body.subject);
    var content = JSON.stringify(req.body.content);
    var hoten = req.params.hoten;
    let time = Date.now();

    await Cauhoi.create({
        malop: 'k64caclc2',
        nguoihoi: hoten,
        tieude: subject,
        noidung: content,
        thoigian: time
    }).then(function (Cauhoi) {
        if (Cauhoi) {
            res.send(Cauhoi);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });

}

const user = {
    uploadCauhoi: uploadCauhoi,
}

module.exports = user;