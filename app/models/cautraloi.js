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
        nguoitraloi: {
            type: Sequelize.STRING
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