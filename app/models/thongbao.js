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
        tieude: {
            type: Sequelize.TEXT
        }, 
        noidung: {
            type: Sequelize.TEXT
        }, 
        batdau: {
            type: Sequelize.DATE(6)
        }, 
        ketthuc: {
            type: Sequelize.DATE(6)
        }, 
    }, {
        timestamps: false
    });
    return Thongbao;
}