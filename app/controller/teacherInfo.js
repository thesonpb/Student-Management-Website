const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const Lophoc = db.Lophoc;
const { QueryTypes, Sequelize } = require('sequelize');
const Op = Sequelize.Op;

//
const teacherInfo = async (req, res) => {
    if (res.locals.user.vaitro == 'sinhvien') res.redirect('/my');
    const username = req.params.email;
    let userInfo = '';
    let malop = req.params.malop;
    const classId = await Lophoc.findAll({
        where: { emailcovan: username },
        attributes: ['malop'],
    });
    userInfo = await Covan.findByPk(username);
    userInfo.dataValues.vaitro = 'covan';
    const sinhviens = await Sinhvien.findAll({
        where: { malop: malop },
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi']
    });

    let arr = [];
    for (var i = 0; i < sinhviens.length; i++) {
        let tonggpa = await Bangdiem.findAll({
            where: { mssv: sinhviens[i].mssv },
            attributes: [[Sequelize.literal('SUM(gpa * tinchi)'), 'result']]
        });
        const tongtinchi = await Bangdiem.sum('tinchi', { where: { mssv: sinhviens[i].mssv } });
        arr.push((Math.round(tonggpa[0].dataValues.result / tongtinchi * 100) / 100).toFixed(2));
    }
    var xs = 0, g = 0, k = 0, tb = 0, y = 0;
    arr.forEach(a => {
        if (a >= 3.6) xs++;
        if (a < 3.6 && a >= 3.2) g++;
        if (a < 3.2 && a >= 2.5) k++;
        if (a < 2.5 && a >= 2) tb++;
        if (a < 2) y++;

    })
    diemsinhvien = await Sinhvien.findAll({
        where: { malop: malop },
        include: [
            {
                model: Bangdiem,
                where: {
                    mssv: Sequelize.col('sinhvien.mssv')
                },
                required: false
            }
        ],
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
    });
    const drl = await Sinhvien.findAll({
        where: { malop: malop },
        include: [
            {
                model: Diemrenluyen,
                where: {
                    mssv: Sequelize.col('sinhvien.mssv')
                },

                required: false
            }
        ],
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
    });

    userInfo.dataValues.xuatsac = xs;
    userInfo.dataValues.gioi = g;
    userInfo.dataValues.kha = k;
    userInfo.dataValues.trungbinh = tb;
    userInfo.dataValues.yeu = y;

    userInfo.dataValues.malopdangxem = malop;
    userInfo.dataValues.sinhvien = sinhviens;
    userInfo.dataValues.diemSinhVien = diemsinhvien;
    userInfo.dataValues.diemRenLuyen = drl;
    userInfo.dataValues.classId = classId;
    userInfo.dataValues.username = username;
    res.render('my', userInfo.dataValues);
}

const changeUserInfo = '';

const user = {
    teacherInfo: teacherInfo,
}

module.exports = user;