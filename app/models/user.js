
module.exports = (sequelize, Sequelize) => {
    const Nguoidung = sequelize.define('nguoidung', {
        tennguoidung: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        matkhau: {
            type: Sequelize.STRING
        },
        vaitro: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });

    return Nguoidung;
}