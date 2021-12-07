const auth = require('./auth');
const user = require('./userInfo')
const profile = require('./profile');
const excel = require('./excelCtl');
const addStudent = require('./addStudent');
const hoctap = require('./hoctap');
const renluyen = require('./renluyen');
const diendan = require('./diendan');
const teacherInfo = require('./teacherInfo');
const studentEditProfile = require('./studentEditProfile');
const teacherEditProfile = require('./teacherEditProfile');
const deleteStudent = require('./deleteStudent');
const deleteTeacher = require('./deleteTeacher');
const uploadTask = require('./uploadTask');
const editStudentInfo = require('./editStudentInfo');
const uploadQuestion = require('./uploadQuestion');
const uploadAnswer = require('./uploadAnswer');
const deleteQuestion = require('./deleteQuestion');
const deleteAnswer = require('./deleteAnswer');
const thongbao = require('./thongbao');
const deleteTask = require('./deleteTask');

module.exports = {
    login : auth.login,
    logout: auth.logout,
    getUserInfo: user.getUserInfo,
    getProfileCovan: profile.getProfileCovan,
    getProfile: profile.getProfile,
    viewStudentProfile: profile.viewStudentProfile,
    upload : excel.upload,
    exportExcel: excel.exportExcel,
    exportHoctap: excel.exportHoctap,
    exportRenluyen: excel.exportRenluyen,
    addStudent: addStudent.addStudent,
    hoctap: hoctap.hoctap,
    renluyen: renluyen.renluyen,
    diendan: diendan.diendan,
    getTeacherInfo: teacherInfo.teacherInfo,
    studentEditProfile: studentEditProfile.studentEditProfile,
    teacherEditProfile: teacherEditProfile.teacherEditProfile,
    deleteStudent: deleteStudent.deleteStudent,
    deleteTeacher: deleteTeacher.deleteTeacher,
    uploadTask: uploadTask.uploadTask,
    editStudentInfo: editStudentInfo.editStudentInfo,
    uploadQuestion: uploadQuestion.uploadQuestion,
    uploadAnswer: uploadAnswer.uploadAnswer,
    deleteQuestion: deleteQuestion.deleteQuestion,
    deleteAnswer: deleteAnswer.deleteAnswer,
    thongbao: thongbao.thongbao,
    deleteTask: deleteTask.deleteTask,
}