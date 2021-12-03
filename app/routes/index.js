const controller = require('../controller/index');
const { uploadAvatar } = require('../controller/profile');
const { checkUser } = require('../middleware/authJWT');
const authJwt = require('../middleware/authJWT');
const upload = require('../middleware/upload');
const bodyParser = require('body-parser');
const chatBox = require('./chat');

function route(app){
    

    app.use(function(req, res, next) {
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
    //GET: Điều hướng đăng xuất
    app.get('/logout', controller.logout);
    //**********************************************************************************************


     //Kiểm tra xem user có hợp lệ không với tất cả phương thức get
     app.get('*', authJwt.checkUser);
    //**********************************************************************************************
    //GET: Điều hướng đến trang cá nhân cua ban than
    app.get('/my',authJwt.verifyToken, controller.getUserInfo);

    app.get('/myclass/:email/:malop', authJwt.verifyToken, controller.getTeacherInfo);

    
    app.get('/hoc-tap', (req, res) => {
        res.render('hoctap');
    })

    app.get('/dien-dan', (req, res) => {
        res.render('diendan');
    })

    app.get('/cong-viec', (req, res) => {
        res.render('congviec');
    })

    app.get('/ren-luyen', (req, res) => {
        res.render('renluyen');
    })

    app.get('/test1', (req, res) => {
        res.render('test1');
    })

    app.get('/test2', (req, res) => {
        res.render('test2');
    })

    //**********************************************************************************************
    //GET: Lấy profile
    app.get('/profile', controller.getProfile)
    app.post('/uploadImage',checkUser, upload.uploadImg.single("img"), uploadAvatar)

    //**********************************************************************************************
    //testUpload
    app.get('/upload', (req, res) => {
        res.render('testUpload')
    })
    app.post('/upload',upload.uploadFile.single('file'), (req, res) => {
        console.log("Info: "+ req.body.info)
        console.log("File: " + req.file.filename);
        res.send("success")
    })
    app.get('/download', controller.exportExcel)

    //GET: Download bảng điểm theo lớp, học kỳ, phân loại
    app.get('/download/:malop/:sem/:classify', controller.exportHoctap)

    //GET: Download bảng điểm rèn luyện theo lớp, học kỳ
    app.get('/download/:malop/:sem', controller.exportRenluyen)

    //********************************************************************************************* */
    //Route: Chức năng chat giữ giảng viên và sv
    const http = require('http');
    const server = http.createServer(app);
    const io = require('socket.io')(server);

    
    app.get('/chat', (req, res) => {
        res.render('chat');
    })

    const users = {}

    io.on('connection', socket => {
        socket.on('new-user', username => {
            users[socket.id] = username
        })
        socket.on('send-chat-message', message => {
            socket.broadcast.emit('chat-message', { message: message, username: users[socket.id] })
        })
    })
    //Khởi tạo 1 server listen tại 1 port
    server.listen(3003);
    //******************************************************************************************** */



    //**********************************************************************************************
    //GET: Điều hướng đến trang chủ
    app.get('/', (req, res) => {
        if(req.cookies.jwt){
            res.redirect('/my');
        }else{
            res.render('home');
        }
    })
    //**********************************************************************************************

    app.post('/add/student/:email/:malop', controller.addStudent)
    app.get('/hoctap', controller.hoctap)

    app.post('/student/editprofile/:mssv', controller.studentEditProfile)
    app.post('/teacher/editprofile/:email', controller.teacherEditProfile)

    app.post('/student/delete/:mssv/:email/:malop', controller.deleteStudent)
    app.post('/teacher/delete/:email', controller.deleteTeacher)

    app.post('/upload/task', controller.uploadTask)

    app.post('/editstudentinfo/:mssv/:email/:malop', controller.editStudentInfo)
}

module.exports = route;