const { Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Covan = sequelize.define('covan', {
        email: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        }, 
        hoten: {
            type: Sequelize.STRING
        }, 
        ngaysinh: {
            type: Sequelize.DATE
        }, 
        sdt: {
            type: Sequelize.INTEGER
        }, 
        khoa: {
            type: Sequelize.STRING
        }, 
    }, {
        timestamps: false
    });
    return Covan;
}