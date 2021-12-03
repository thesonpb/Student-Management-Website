const db = require("../models/index");
const Thongbao = db.Thongbao;
const { QueryTypes, Sequelize } = require('sequelize');

exports.uploadTask = async (req, res) => {
    var subject = JSON.stringify(req.body.subject);
    var opendate = req.body.opendate;
    var duedate = req.body.duedate;
    var content = JSON.stringify(req.body.content);

    const thongbao = await Thongbao.findAll({
        raw: true,
    })
    // console.log("All users:", typeof(thongbao));
    // console.log("All users:", thongbao.dataValues);
    // res.render('my', thongbao.dataValues);


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