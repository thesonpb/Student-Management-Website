const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const Lophoc = db.Lophoc;
const Cauhoi = db.Cauhoi;
const Cautraloi = db.Cautraloi;
const { QueryTypes, Sequelize } = require('sequelize');


const diendan = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    let userInfo = '';
    if (userRole == 'sinhvien') {
        userInfo = await Sinhvien.findByPk(username);
        userInfo.dataValues.vaitro = 'sinhvien';
        if (req.params.malop != userInfo.dataValues.malop) res.redirect(`/dien-dan/${userInfo.dataValues.malop}`);
        const diemsinhvien = await Sinhvien.findAll({
            where: { mssv: username },
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
        const sinhviens = await Sinhvien.findAll({
            where: { malop: req.params.malop },
            attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
        });
        const drl = await Sinhvien.findAll({
            where: { mssv: username },
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
        const cauhoi = await Cauhoi.findAll({
            where: { malop: req.params.malop },
            attributes: ['macauhoi', 'nguoihoi', 'tieude', 'noidung', 'thoigian']
        });
        const cautraloi = await Cautraloi.findAll({
            attributes: ['macauhoi', 'nguoitraloi', 'noidung', 'thoigian']
        });
        userInfo.dataValues.diemSinhVien = diemsinhvien;
        userInfo.dataValues.sinhvien = sinhviens;
        userInfo.dataValues.diemRenLuyen = drl;
        userInfo.dataValues.cauhoi = cauhoi;
        userInfo.dataValues.cautraloi = cautraloi;
        res.render('diendan', userInfo.dataValues);

    } else if (userRole == 'covan') {
        userInfo = await Covan.findByPk(username);
        userInfo.dataValues.vaitro = 'covan';
        const diemsinhvien = await Sinhvien.findAll({
            where: { malop: req.params.malop },
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
        const sinhviens = await Sinhvien.findAll({
            where: { malop: req.params.malop },
            attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt', 'sdtphuhuynh', 'diachi'],
        });
        const drl = await Sinhvien.findAll({
            where: { malop: req.params.malop },
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
        const classId = await Lophoc.findAll({
            where: { emailcovan: username },
            attributes: ['malop'],
        });
        const cauhoi = await Cauhoi.findAll({
            where: { malop: req.params.malop },
            attributes: ['macauhoi', 'nguoihoi', 'tieude', 'noidung', 'thoigian']
        });
        const cautraloi = await Cautraloi.findAll({
            attributes: ['macauhoi', 'nguoitraloi', 'noidung', 'thoigian']
        });
        
        userInfo.dataValues.diemSinhVien = diemsinhvien;
        userInfo.dataValues.sinhvien = sinhviens;
        userInfo.dataValues.diemRenLuyen = drl;
        userInfo.dataValues.classId = classId;
        userInfo.dataValues.cauhoi = cauhoi;
        userInfo.dataValues.cautraloi = cautraloi;
        res.render('diendan', userInfo.dataValues);
    }
}


const user = {
    diendan: diendan,
}

module.exports = user;