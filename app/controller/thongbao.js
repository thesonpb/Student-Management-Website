const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const Lophoc = db.Lophoc;
const Thongbao = db.Thongbao;
const { QueryTypes, Sequelize } = require('sequelize');


const thongbao = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    let userInfo = '';
    if (userRole == 'sinhvien') {
        userInfo = await Sinhvien.findByPk(username);
        userInfo.dataValues.vaitro = 'sinhvien';
        if (req.params.malop != userInfo.dataValues.malop) res.redirect(`/thong-bao/${userInfo.dataValues.malop}`);
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
        const thongbaocalop = await Thongbao.findAll({
            where: { malop: req.params.malop, calop: 'all' }
        });

        const thongbaorieng = await Thongbao.findAll({
            where: { mssv: username }
        })

        var chung = []
        for (var i = 0; i < thongbaocalop.length; i++) {
            chung.push(new Date(thongbaocalop[i].thoigian).toLocaleString('br-FR'));
        }
        var rieng = []
        for (var i = 0; i < thongbaorieng.length; i++) {
            rieng.push(new Date(thongbaorieng[i].thoigian).toLocaleString('br-FR'));
        }
        

        userInfo.dataValues.diemSinhVien = diemsinhvien;
        userInfo.dataValues.sinhvien = sinhviens;
        userInfo.dataValues.diemRenLuyen = drl;
        userInfo.dataValues.thongbaochung = thongbaocalop;
        userInfo.dataValues.thongbaorieng = thongbaorieng;
        userInfo.dataValues.thoigianchung = chung;
        userInfo.dataValues.thoigianrieng = rieng;
        res.render('thongbao', userInfo.dataValues);

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
        
        console.log(req.params.malop)
        const thongbao = await Thongbao.findAll({
            where: { malop: req.params.malop }
        });


        var thoigian = []
        for (var i = 0; i < thongbao.length; i++) {
            thoigian.push(new Date(thongbao[i].thoigian).toLocaleString('br-FR'));
        }
        
        userInfo.dataValues.diemSinhVien = diemsinhvien;
        userInfo.dataValues.sinhvien = sinhviens;
        userInfo.dataValues.diemRenLuyen = drl;
        userInfo.dataValues.classId = classId;
        userInfo.dataValues.thongbaochung = thongbao;
        userInfo.dataValues.thoigianchung = thoigian;
        res.render('thongbao', userInfo.dataValues);
    }
}


const user = {
    thongbao: thongbao,
}

module.exports = user;