const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Cauhoi = sequelize.define('cauhoi', {
        macauhoi: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        malop: {
            type: Sequelize.STRING
        }, 
        mssv: {
            type: Sequelize.INTEGER
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
    return Cauhoi;
}