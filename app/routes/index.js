const controller = require('../controller/index');
const { uploadAvatar } = require('../controller/profile');
const { checkUser } = require('../middleware/authJWT');
const authJwt = require('../middleware/authJWT');
const upload = require('../middleware/upload');
const chatBox = require('./chat');

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
        //res.render('home');
    })
    //**********************************************************************************************
}

module.exports = route;