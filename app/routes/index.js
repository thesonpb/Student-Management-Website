const controller = require('../controller/index');
const authJwt = require('../middleware/authJWT');


function route(app){
    
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });


    //Phần đăng nhập
    //**********************************************************************************************
    //POST: Điều hướng đăng nhập khi submit
    app.post("/login", controller.login);

    //Kiểm tra xem user có hợp lệ không với tất cả phương thức get
    app.get('*', authJwt.checkUser);
    //GET: Điều hướng đăng xuất
    app.get('/logout', controller.logout);
    //**********************************************************************************************


    //**********************************************************************************************
    //GET: Điều hướng đến trang cá nhân cua ban than
    app.get('/my',authJwt.verifyToken, controller.getUserInfo);


    //**********************************************************************************************
    //GET: Lấy profile
    app.get('/profile', controller.getProfile)

    //**********************************************************************************************
    //testUploadxlsx
    app.get('/upload', (req, res) => {
        res.render('testUpload')
    })
    app.post('/add/student', (req, res) => {
        controller.addStudent
    })

    //POST: Upload ảnh và lưu vào db
    const upload = require('../middleware/upload');
    app.post("/upload", upload.single("file"), controller.upload);
    //**********************************************************************************************


    //**********************************************************************************************
    //GET: Điều hướng đến trang chủ
    app.get('/', (req, res) => {
        if(req.cookies.jwt){
            res.redirect('/my');
        }else{
            res.render('home');
        }
        //res.render('home');
    })
    //**********************************************************************************************
}

module.exports = route;