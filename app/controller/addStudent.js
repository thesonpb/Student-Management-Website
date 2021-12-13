const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;
const Taikhoan = db.Taikhoan;
const Lophoc = db.Lophoc;

//require for read excel file
const readXlsxFile = require("read-excel-file/node");


const addStudent = async (req, res) => {
    await Sinhvien.findOne({ where: { mssv: req.body.mssv } }).then(user => {
        if (user) {
            return res.status(404).json({ message: "MSSV đã tồn tại" });
        }
    });
    var emailcovan = req.params.email;
    var malopcu = req.params.malop;
    var mssv = (req.body.mssv);
    var hoten = (req.body.hoten);
    var ngaysinh = (req.body.ngaysinh);
    var malop = (req.body.malop);
    var email = (req.body.email);
    var sdt = (req.body.sdt);
    var sdtphuhuynh = (req.body.sdtphuhuynh);
    var diachi = (req.body.diachi);
    try {
        await Sinhvien.create({
            mssv: mssv,
            hoten: hoten,
            email: email,
            ngaysinh: ngaysinh,
            sdt: sdt,
            khoa: "",
            malop: malop,
            avatar: "",
            sdtphuhuynh: sdtphuhuynh,
            diachi: diachi
        });
    } catch (err) {
        console.log(err);
    }
    try {
        await Bangdiem.create({
            malop: malop,
            hocky: "",
            mssv: mssv,
            tinchi: 0,
            gpa: 0.0,
            canhbaohocvu: ""
        });
    } catch (err) {
        console.log(err);
    }
    try {
        await Diemrenluyen.create({
            mssv: mssv,
            ythuc: 0,
            noiquy: 0,
            hoatdong: 0,
            phamchat: 0,
            phutrachlop: 0,
            hocky: ""
        });
    } catch (err) {
        console.log(err);
    }
    try {
        await Taikhoan.create({
            tennguoidung: mssv,
            matkhau: "1",
            vaitro: "sinhvien"
        });
    } catch (err) {
        console.log(err);
    }
    res.redirect(`/myclass/${emailcovan}/${malopcu}`);
};



const addClass =  async (req, res) => {
    const emailCovan = req.params.email;
    //const malop = req.body.malop;
   
    

    //Thêm danh sách lớp từ excel
    try {
        //Get and check file upload from req.file
        if (req.file == undefined) {
            
            
            
            res.status(400).send("Please upload an excel file!");
        }

        let path = appRoot + '/public/assets/uploads/excel/' + req.file.filename;

        //Use read-excel-file to read Excel file in uploads folder, 
        //the data which is returned as rows will be changed to array
        readXlsxFile(path).then((rows) => {

            // skip header (first row)
            rows.shift();

            let students = [];

            rows.forEach((row) => {
                let student = {
                    mssv: row[0],
                    hoten: row[1],
                    email: row[2],
                    ngaysinh: row[3],
                    sdt: row[4],
                    khoa: row[5],
                    malop: row[6],
                    avatar: null,
                    sdtphuhuynh: row[7],
                    diachi: row[8],
                };

                students.push(student);
            });

            console.log(students[0].malop)

            //Lấy mã lớp từ danh sách sinh viên\
            Lophoc.create({
                malop : students[0].malop,
                emailcovan : emailCovan
            })

            //Thêm sinh viên vào DB
            Sinhvien.bulkCreate(students)
                .then(() => {
                    console.log('Success')
                })
                .catch((err) => {
                    console.log(err);
                });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Could not upload the file: " + req.file.originalname,
        });
    }

    res.redirect('back');
}

const user = {
    addStudent: addStudent,
    addClass: addClass,
}

module.exports = user;