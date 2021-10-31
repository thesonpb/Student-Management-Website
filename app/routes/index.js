const controller = require('../controller/index');
const test = require('../controller/test');
const authJwt = require('../middleware/authJWT');

function route(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    //Kiểm tra xem user có hợp lệ không với tất cả phương thức get
    app.get('*', authJwt.checkUser);

    //Điều hướng đăng nhập khi submit
    app.post("/login", controller.login);

    //Điều huong dang xuat
    app.get('/logout', controller.logout);


    //Điều hướng đến trang cá nhân cua ban than
    app.get('/my',authJwt.verifyToken, (req, res) => {
        res.render('my');
    })

    
    //test token
    app.get(
        "/test",
        authJwt.verifyToken,
        test.studentContent
    );  
    
    app.get('/', (req, res) => {
        if(req.cookies.jwt){
            res.redirect('/my');
        }else{
            res.render('home');
        }
        //res.render('home');
    })
}

module.exports = route;