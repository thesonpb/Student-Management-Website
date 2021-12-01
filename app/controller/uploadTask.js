const db = require("../models/index");
const Thongbao = db.Thongbao;


exports.uploadTask = async (req, res) => {
    var subject = JSON.stringify(req.body.subject);
    var opendate = JSON.stringify(req.body.opendate);
    var duedate = JSON.stringify(req.body.duedate);
    var content = JSON.stringify(req.body.content);
    await Thongbao.create({
        malop: 'k64caclc2' ,
        tieude: subject,
        batdau: opendate,
        ketthuc: duedate,
        noidung: content
    }).then(function (Thongbao) {
        if (Thongbao) {
            res.send(Thongbao);
        } else {
            res.status(400).send('Error in insert new record');
        }
    });
};