const auth = require('./auth');
const user = require('./userInfo')
const profile = require('./profile');
const excel = require('./excelCtl');
const addStudent = require('./addStudent');
const hoctap = require('./hoctap');
const teacherInfo = require('./teacherInfo');
const studentEditProfile = require('./studentEditProfile');
module.exports = {
    login : auth.login,
    logout: auth.logout,
    getUserInfo: user.getUserInfo,
    getProfile: profile.getProfile,
    upload : excel.upload,
    exportExcel: excel.exportExcel,
    addStudent: addStudent,
    hoctap: hoctap.hoctap,
    getTeacherInfo: teacherInfo.teacherInfo,
    studentEditProfile: studentEditProfile.studentEditProfile,
}