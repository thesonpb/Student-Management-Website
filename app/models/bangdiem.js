
module.exports = (sequelize, Sequelize) => {
    const Bangdiem = sequelize.define('bangdiem', {
        malop: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        hocky: {
            type: Sequelize.INTEGER
        },
        namhoc: {
            type: Sequelize.INTEGER
        },
        mssv: {
            type: Sequelize.INTEGER
        },
        tinchi: {
            type: Sequelize.INTEGER
        },
        gpa: {
            type: Sequelize.FLOAT
        },
        canhbaohocvu: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });

    return Bangdiem;
}