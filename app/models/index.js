const config = require('../config/db');

const Sequelize = require('sequelize');

//Config database
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        operatorsAliases: false,

        pool: {
        max: config.pool.max,
        min: config.pool.min,
        acquire: config.pool.acquire,
        idle: config.pool.idle
        }
    }
); 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./user')(sequelize, Sequelize);
db.userInfo = require('./userInfo')(sequelize, Sequelize);

db.ROLES = ['student', 'lecturerer', 'admin'];

let connectDb = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
db.connectDb = connectDb;

module.exports = db;
