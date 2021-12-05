const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Covan = db.Covan;
const Lophoc = db.Lophoc;
const Admin = db.Admin;
const Thongbao = db.Thongbao;
const Cauhoi = db.Cauhoi;
const { QueryTypes, Sequelize } = require('sequelize');


const getUserInfo = async (req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    let sinhviens = null;
    let drl = null;
    let diemsinhvien = null;
    let classId = null;
    let lophoc = null;
    let userInfo = '';
    let covan = '';
    let malop = '';
    if (userRole == 'admin') {
        userInfo = await Admin.findByPk(username);
        userInfo.dataValues.role = 'admin';
        sinhviens = await Sinhvien.findAll({
            attributes: ['mssv', 'hoten', 'ngaysinh', 'malop', 'email', 'sdt']
        });
        lophoc = await Lophoc.findAll();
        covan = await Covan.findAll();
        
        //------------------------vinh
        const cauhoi = await Cauhoi.findAll({
            raw: true
        });
        userInfo.dataValues.cauhoi = cauhoi;
        //------------------------vinh

        userInfo.dataValues.sinhvien = sinhviens;
        userInfo.dataValues.lophoc = lophoc;
        userInfo.dataValues.covan = covan;
        res.render('admin', userInfo.dataValues);
    }
    else if (userRole == 'sinhvien') {
        userInfo = await Sinhvien.findByPk(username);
        userInfo.dataValues.role = 'sinhvien';
        malop = userInfo.dataValues.malop;

        diemsinhvien = await Sinhvien.findAll({
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
        drl = await Sinhvien.findAll({
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
        const tongtinchi = await Bangdiem.sum('tinchi', { where: { mssv: username } });
        const tonggpa = await Bangdiem.findAll({
            where: { mssv: username },
            attributes: [[Sequelize.literal('SUM(gpa * tinchi)'), 'result']]
        });
        const ngaysinhchuan = await Sinhvien.findOne({
            where: { mssv: username },
            attributes: ['ngaysinh']
        })
        //------------------------vinh
        const cauhoi = await Cauhoi.findAll({
            raw: true
        });
        userInfo.dataValues.cauhoi = cauhoi;
        //------------------------vinh

        userInfo.dataValues.ngaysinhchuan = ngaysinhchuan;
        userInfo.dataValues.tonggpa = (Math.round(tonggpa[0].dataValues.result / tongtinchi * 100) / 100).toFixed(2);
        userInfo.dataValues.tongtinchi = tongtinchi;
        userInfo.dataValues.diemSinhVien = diemsinhvien;
        userInfo.dataValues.diemRenLuyen = drl;
        userInfo.dataValues.classId = classId;
        userInfo.dataValues.username = username;
        res.render('my', userInfo.dataValues);
    } else if (userRole == 'covan') {
        userInfo = await Covan.findByPk(username);
        userInfo.dataValues.role = 'covan';
        classId = await Lophoc.findAll({
            where: { emailcovan: username },
            attributes: ['malop'],
        });
        malop = classId[0].malop;
        //-------------------------------------vinh
        // const cauhoi = await Cauhoi.findAll({
        //     raw: true
        // });
        // res.render('/myclass/${username}/${malop}', {cauhoi: cauhoi});
        //-------------------------------------vinh

        res.redirect(`/myclass/${username}/${malop}`);
    }
}

const changeUserInfo = '';

const user = {
    getUserInfo: getUserInfo,
}

module.exports = user;