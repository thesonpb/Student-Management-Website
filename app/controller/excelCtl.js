const db = require("../models/index");
const Sinhvien = db.Sinhvien;

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
    try {
        //Get and check file upload from req.file
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
    
        let path = appRoot + '/public/assets/uploads/' + req.file.filename;
        
        //Use read-excel-file to read Excel file in uploads folder, 
        //the data which is returned as rows will be changed to array
        readXlsxFile(path).then((rows) => {
        
            // skip header
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
                gpa: row[6],
                tinchi: row[7],
                malop: row[8],
            };
  
            students.push(student);
        });
  
        Sinhvien.bulkCreate(students)
            .then(() => {
                res.status(200).send({
                    message: "Uploaded the file successfully: " + req.file.originalname,
                });
            })
            .catch((error) => {
                res.status(500).send({
                    message: "Fail to import data into database!",
                    error: error.message,
                });
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Could not upload the file: " + req.file.originalname,
      });
    }
  };


  
  module.exports = {
    upload: upload,

  };