const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Lophoc = sequelize.define('lophoc', {
        malop: {
            type: Sequelize.STRING,
            primaryKey: true,
        }, 
        emailcovan: {
            type: Sequelize.STRING
        }, 
    }, {
        timestamps: false
    });
    return Lophoc;
}