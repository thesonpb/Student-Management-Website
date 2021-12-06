const moment = require("moment");

module.exports = (sequelize, Sequelize) => {
    const Covan = sequelize.define('covan', {
        email: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        hoten: {
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
        avatar: {
            type: Sequelize.STRING
        }, 
    }, {
        timestamps: false
    });
    return Covan;
}