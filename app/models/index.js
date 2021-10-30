const config = require('../config/db');

const Sequelize = require('sequelize');
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
        },
        define: {
            freezeTableName: true
        }

    }
); 

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.nguoidung = require('../models/user')(sequelize, Sequelize);
//db.role = require('../models/role');
db.sinhvien = require('../models/sinhvien')(sequelize, Sequelize);

db.vaitro = ['sinhvien', 'covan', 'admin'];

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
