const controller = require('../controller/auth');

//Định tuyến đăng nhập
module.exports = function(app) {
    app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
    app.post("/auth/login", controller.login);
  };