const path = require('path');
const express = require("express");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const morgan = require('morgan')
const db = require('./app/models/index');


const app = express();
app.use(cookieParser());
const port = 3000;

//import module
const route = require('./app/routes');

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

//HTTP logger
app.use(morgan('combined'));

//Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'public/views'));
app.use(express.static(__dirname + '/public'));
//app.use('/uploads', express.static('uploads'));

console.log(__dirname);
global.appRoot = path.resolve(__dirname);

//co thể sau này nó là restfull api, cứ để sẵn
// var corsOptions = {
//     origin: `http://localhost:${port}`,
// }
// app.use(cors(corsOptions));


//routes init
route(app);

db.connectDb();
// let getData = async (req, res) =>{
//   try{
//     let data = await db.user.findAll();
//     console.log(data);
//   }catch(e){
//     console.log(e);
//   }
// }
// getData();


app.listen(port, () => {
  console.log(`The web app is listening at http://localhost:${port}`)
})
