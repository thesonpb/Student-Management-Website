const controller = require('../controller/login');
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
    })

    
    //điều hướng đến trang cá nhân cua ban than
    app.get('/my/', (req, res) => {
        res.render('my');
    })

    //dieu huong dang xuat
    app.post('/users/logout', (req, res)=>{

    })

      
    app.post('/search', (req, res) => {
      
        res.send(req.body);
    });
}

module.exports = route;