module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('admin', {
        tennguoidung: {
            type: Sequelize.STRING,
            primaryKey: true,
        }, 
        hoten: {
            type: Sequelize.STRING
        }, 
    }, {
        timestamps: false
    });
    return Admin;
}