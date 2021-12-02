module.exports = (sequelize, Sequelize) => {
    const Taikhoan = sequelize.define('taikhoan', {
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

    return Taikhoan;
}