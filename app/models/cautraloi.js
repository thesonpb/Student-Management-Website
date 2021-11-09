const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Cautraloi = sequelize.define('cautraloi', {
        macautraloi: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        }, 
        macauhoi: {
            type: Sequelize.INTEGER
        }, 
        mssv: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }, 
        emailcovan: {
            type: Sequelize.STRING,
            allowNull: true,
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
    return Cautraloi;
}