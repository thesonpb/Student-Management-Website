module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('userInfo', {
        id: {
            type: Sequelize.STRING,
            primaryKey: true,
        },
        firtName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
    }, {
        timestamps: false
    });

    return User;
}