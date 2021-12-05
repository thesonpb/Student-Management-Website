const auth = require('./auth');
const user = require('./userInfo')
const profile = require('./profile');
const excel = require('./excelCtl');
const addStudent = require('./addStudent');
const hoctap = require('./hoctap');
const teacherInfo = require('./teacherInfo');
const studentEditProfile = require('./studentEditProfile');
const teacherEditProfile = require('./teacherEditProfile');
const deleteStudent = require('./deleteStudent');
const deleteTeacher = require('./deleteTeacher');
const uploadTask = require('./uploadTask');
const editStudentInfo = require('./editStudentInfo');
const uploadCauhoi = require('./uploadCauhoi');

module.exports = {
    login : auth.login,
    logout: auth.logout,
    getUserInfo: user.getUserInfo,
    getProfile: profile.getProfile,
    upload : excel.upload,
    exportExcel: excel.exportExcel,
    exportHoctap: excel.exportHoctap,
    exportRenluyen: excel.exportRenluyen,
    addStudent: addStudent.addStudent,
    hoctap: hoctap.hoctap,
    getTeacherInfo: teacherInfo.teacherInfo,
    studentEditProfile: studentEditProfile.studentEditProfile,
    teacherEditProfile: teacherEditProfile.teacherEditProfile,
    deleteStudent: deleteStudent.deleteStudent,
    deleteTeacher: deleteTeacher.deleteTeacher,
    uploadTask: uploadTask.uploadTask,
    editStudentInfo: editStudentInfo.editStudentInfo,
    uploadCauhoi: uploadCauhoi.uploadCauhoi,
}