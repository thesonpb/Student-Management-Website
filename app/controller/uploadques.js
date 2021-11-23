const db = require("../models/index");
const bodyParser = require("body-parser");
const Cauhoi = db.cauhoi;

exports.uploadQues = async (req, res) => {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date + ' ' + time;
    var tieude = JSON.stringify(req.body.subject);
    var noidung = JSON.stringify(req.body.content);
    await Cauhoi.create({
        malop: 'k64caclc2',
        mssv: 19021358, 
        tieude: tieude,
        noidung: noidung, 
        thoigian: dateTime
    }).then(function (Cauhoi) {
        if (Cauhoi) {
            res.send(Cauhoi);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
};
