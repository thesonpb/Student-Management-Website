const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Diemrenluyen = sequelize.define('diemrenluyen', {
        mssv: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        }, 
        ythuc: {
            type: Sequelize.INTEGER
        }, 
        noiquy: {
            type: Sequelize.INTEGER
        }, 
        hoatdong: {
            type: Sequelize.INTEGER
        }, 
        phamchat: {
            type: Sequelize.INTEGER
        }, 
        phutrachlop: {
            type: Sequelize.INTEGER
        }, 
    }, {
        timestamps: false
    });
    return Diemrenluyen;
}