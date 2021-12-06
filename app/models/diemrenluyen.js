module.exports = (sequelize, Sequelize) => {
    const Diemrenluyen = sequelize.define('diemrenluyen', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
        },
        mssv: {
            type: Sequelize.INTEGER
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
        hocky: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });
   
    return Diemrenluyen;
}