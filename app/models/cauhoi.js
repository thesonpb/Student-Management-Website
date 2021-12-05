module.exports = (sequelize, Sequelize) => {
    const Cauhoi = sequelize.define('cauhoi', {
        macauhoi: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        malop: {
            type: Sequelize.STRING
        },
        nguoihoi: {
            type: Sequelize.STRING
        },
        tieude: {
            type: Sequelize.TEXT
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
   
    return Cauhoi;
}