const express = require('express');
const db = require('./database');

const app = express();

app.use("/library", express.static(__dirname + '/library'));
app.set('view engine', 'pug');
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile('./view/login.html', { root: __dirname });
});

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

app.listen(3000, ()=> {
    console.log('listening on port 3000...');
});