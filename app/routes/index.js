const controller = require('../controller/index');
const { uploadAvatar } = require('../controller/profile');
const { checkUser } = require('../middleware/authJWT');
const authJwt = require('../middleware/authJWT');
const upload = require('../middleware/upload');
const bodyParser = require('body-parser');
// const chatBox = require('./chat');




function route(app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true
    }));

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
    app.get('/my', authJwt.verifyToken, controller.getUserInfo);

    app.post('/myclass', authJwt.verifyToken, controller.getTeacherInfo);
    //**********************************************************************************************
    //GET: Lấy profile
    app.get('/profile', controller.getProfile);
    // app.post('/uploadImage', checkUser, upload.uploadImg.single("img"), uploadAvatar);


    //**********************************************************************************************
    //testUploadxlsx
    app.get('/upload', (req, res) => {
        res.render('testUpload')
    })
    

    //POST: Upload ảnh và lưu vào db
    app.post('/upload', upload.uploadFile.single('file'), (req, res) => {
        console.log("Info: " + req.body.info)
        console.log("File: " + req.file.filename);
        res.send("success")
    })
    app.get('/download', controller.exportExcel)
    //**********************************************************************************************


    //**********************************************************************************************
    //GET: Điều hướng đến trang chủ
    app.get('/', (req, res) => {
        if (req.cookies.jwt) {
            res.redirect('/my');
        } else {
            res.render('home');
        }
        //res.render('home');
    })
    //**********************************************************************************************
    app.post('/add/student', (req, res) => {
        controller.addStudent
    })
    app.get('/hoctap', controller.hoctap)

    app.post('/student/editprofile/:mssv', controller.studentEditProfile)
}

module.exports = route;