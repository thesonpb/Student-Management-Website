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
            type: Sequelize.DATE
        }, 
        ketthuc: {
            type: Sequelize.DATE
        }, 
    }, {
        timestamps: false
    });
    return Thongbao;
}