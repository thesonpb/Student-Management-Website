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
            type: Sequelize.DATE
        }, 
        sdt: {
            type: Sequelize.STRING
        }, 
        khoa: {
            type: Sequelize.STRING
        }, 
    }, {
        timestamps: false
    });
    return Covan;
}