const mysql = require('mysql2');

module.exports = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'localadmin1234', 
    database: 'student_management',
});