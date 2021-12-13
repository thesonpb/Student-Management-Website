

function chatBox(app){
    const http = require('http');
    const server = http.createServer(app);
    const io = require('socket.io')(server);

    
    app.get('/chat', (req, res) => {
        res.render('chat');
    })

    const users = {}

    io.on('connection', socket => {
        socket.on('new-user', username => {
            users[socket.id] = username;
        })
        socket.on('send-chat-message', message => {
            socket.broadcast.emit('chat-message', { message: message, username: users[socket.id] })
        })
    })
    //Khởi tạo 1 server listen tại 1 port
    server.listen(3003);
}


module.exports = chatBox;