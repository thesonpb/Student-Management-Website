const auth = require('./auth');
const user = require('./userInfo')
const profile = require('./profile');
const excel = require('./excelCtl');
const addStudent = require('./addStudent');
module.exports = {
    login : auth.login,
    logout: auth.logout,
    getUserInfo: user.getUserInfo,
    getProfile: profile.getProfile,
    upload : excel.upload,
    addStudent: addStudent,
}