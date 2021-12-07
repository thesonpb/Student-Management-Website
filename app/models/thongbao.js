const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Thongbao = sequelize.define('thongbao', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        malop: {
            type: Sequelize.STRING
        }, 
        emailcovan: {
            type: Sequelize.STRING
        }, 
        calop: {
            type: Sequelize.STRING
        }, 
        mssv: {
            type: Sequelize.INTEGER, 
            default: null
        }, 
        tieude: {
            type: Sequelize.TEXT
        }, 
        noidung: {
            type: Sequelize.TEXT
        }, 
        thoigian: {
            type: Sequelize.DATE
        }, 
    }, {
        timestamps: false
    });
    return Thongbao;
}