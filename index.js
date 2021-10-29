const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/library", express.static(__dirname + '/library'));
app.set('view engine', 'pug');
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('./view/login.html', { root: __dirname });
});

// app.get('/all-user', (req, res) => {
//     db.query(`select matkhau from nguoidung where tennguoidung = 'son@son'`, function(err, data) {
//         if (err) throw err;
//         // res.send('user-list', { title: 'User list', userData: data });
//         // console.log(data);
//         // res.send(data);
//         console.log(data);
//         if (data = { data: '1'}) res.send('success');
//     })
// });

app.post('/', (req, res) => {
    const { malop, emailcovan } = req.body;
    if (malop && emailcovan) {
        try {
            db.promise().query(`INSERT INTO lophoc VALUES('${malop}', '${emailcovan}')`);
        } catch (err) {
            console.log(err);
        }
    }
});

app.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(password);
    db.query(`select matkhau from nguoidung where tennguoidung = '${username}'`, function (err, rows) {
        if (err) {
            // console.log('err');
            throw err;
        }
        if (password == rows[0].matkhau) {
            res.sendFile('./view/student.html', { root: __dirname });
            console.log('true');
        }
        
    });

});

app.post('/admin/secret/signup', (req, res) => {
    const { username, password, type } = req.body;
    if (username && password && type) {
        try {
            db.promise().query(`INSERT INTO nguoidung VALUES('${username}', '${password}', '${type}')`);
            res.send('success');
        } catch (err) {
            console.log(err);
        }
    }
})

app.listen(3000, () => {
    console.log('listening on port 3000...');
});