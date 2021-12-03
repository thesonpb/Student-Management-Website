const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
    const Sinhvien = sequelize.define('sinhvien', {
        mssv: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        hoten: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        ngaysinh: {
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('ngaysinh')).format('DD/MM/YYYY');
            }
        },
        sdt: {
            type: Sequelize.STRING
        },
        khoa: {
            type: Sequelize.STRING
        },
        malop: {
            type: Sequelize.STRING
        },
        avatar: {
            type: Sequelize.STRING
        },
        sdtphuhuynh: {
            type: Sequelize.STRING
        },
        diachi: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });

    return Sinhvien;
}