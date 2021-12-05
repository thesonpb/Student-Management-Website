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
        },
        define: {
            freezeTableName: true,
        }
    }
); 

//Tạo Object tên db
const db = {};

// db.Sequelize = Sequelize;
// db.sequelize = sequelize;

db.Taikhoan = require('./taikhoan')(sequelize, Sequelize);
//db.userInfo = require('./userInfo')(sequelize, Sequelize);
db.Sinhvien = require('./sinhvien')(sequelize, Sequelize);
db.Covan = require('./covan')(sequelize, Sequelize);
db.Bangdiem = require('./bangdiem')(sequelize, Sequelize);
db.Diemrenluyen = require('./diemrenluyen')(sequelize, Sequelize);
db.Lophoc = require('./lophoc')(sequelize, Sequelize);
db.Admin = require('./admin')(sequelize, Sequelize);
db.Thongbao = require('./thongbao')(sequelize, Sequelize);
db.Cauhoi = require('./cauhoi')(sequelize, Sequelize);
db.Cautraloi = require('./cautraloi')(sequelize, Sequelize);

db.Diemrenluyen.belongsTo(db.Sinhvien, {foreignKey: 'mssv'});
db.Sinhvien.hasOne(db.Diemrenluyen, {foreignKey: 'mssv'});
db.Bangdiem.belongsTo(db.Sinhvien, {foreignKey: 'mssv'});
db.Sinhvien.hasOne(db.Bangdiem, {foreignKey: 'mssv'});


const connectDb = async ()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
db.connectDb = connectDb;

module.exports = db;
