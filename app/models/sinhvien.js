const models = require('./index');
const Diemrenluyen = require("./diemrenluyen");

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
            type: Sequelize.DATE
        }, 
        sdt: {
            type: Sequelize.STRING
        }, 
        khoa: {
            type: Sequelize.STRING
        }, 
        gpa: {
            type: Sequelize.FLOAT
        }, 
        tinchi: {
            type: Sequelize.INTEGER
        }, 
        malop: {
            type: Sequelize.STRING
        }, 
        avatar: {
            type: Sequelize.STRING
        }, 
        canhbaohocvu: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });
    
    return Sinhvien;
}