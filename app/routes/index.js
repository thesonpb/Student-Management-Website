const controller = require('../controller/index');
const test = require('../controller/test');
const { verifyToken } = require('../middleware/authJWT');
const authJwt = require('../middleware/authJWT');

function route(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });

    app.get('*', authJwt.checkUser);

    //Điều hướng đăng nhập
    app.post("/login", controller.login);

    //dieu huong dang xuat
    app.get('/logout', controller.logout);


    //điều hướng đến trang cá nhân cua ban than
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