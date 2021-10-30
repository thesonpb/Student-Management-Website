const controller = require('../controller/login');
const mycontroller = require('../controller/load');
const uploadTaskController = require('../controller/uploadtask');
const uploadQuesController = require('../controller/uploadques');
const addStudentController = require('../controller/addstudent');
const express = require('express');

function route(app){

    app.use("../../public", express.static(__dirname + '../../public'));
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
    //Điều hướng đăng nhập
    app.post("/login", controller.login);
    
    
    app.get('/', (req, res) => {
        res.render('home');
    });

    app.get('/profile', (req, res) => {
      res.render('profile');
    })
    
    //điều hướng đến trang cá nhân cua ban than
    app.get('/my/', mycontroller.userinfo);

    //dieu huong dang xuat
    app.post('/users/logout', (req, res)=>{

    })

    app.post('/upload/task', uploadTaskController.uploadTask);

    app.post('/upload/question', uploadQuesController.uploadQues);

    // app.post('/add/student', addStudentController.addStudent);
      
    app.post('/search', (req, res) => {
      
        res.send(req.body);
    });
}

module.exports = route;