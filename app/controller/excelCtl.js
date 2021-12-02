//require for read excel file
const readXlsxFile = require("read-excel-file/node");
//require for make excel file
const excel = require("exceljs");

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const db = require("../models/index");
// const { Sequelize } = require("sequelize/types");
const Sinhvien = db.Sinhvien;
const Bangdiem = db.Bangdiem;
const Diemrenluyen = db.Diemrenluyen;



const upload = async (req, res) => {
    try {
        //Get and check file upload from req.file
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
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

const exportExcel = async (req, res) => {
    await Sinhvien.findAll({
        where: { malop: req.params.malop }
    }).then(rows => {

        let students = [];

        //Get all students information and push them to an array 
        rows.forEach((row) => {
            students.push({
                mssv: row.mssv,
                hoten: row.hoten,
                email: row.email,
                ngaysinh: row.ngaysinh,
                sdt: row.sdt,
                khoa: row.khoa,
                malop: row.malop,
            })
        });

        //Create a excel worksheet
        let excelFileName = req.params.malop;
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet(excelFileName);

        //Create excel first row
        worksheet.columns = [
            { header: "Mssv", key: "mssv", width: 10 },
            { header: "Ho ten", key: "hoten", width: 30 },
            { header: "Email", key: "email", width: 40 },
            { header: "Ngay sinh", key: "ngaysinh", width: 15 },
            { header: "Sdt", key: "sdt", width: 15 },
            { header: "Khoa", key: "khoa", width: 10 },
            { header: "Ma lop", key: "malop", width: 10 },
        ];

        //Add array students to excel sheet
        worksheet.addRows(students);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + excelFileName + ".xlsx"
        );


        //Use Workbook.xlsx.write() to write out Stream as response
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });

    })
}

const exportHoctap = async (req, res) => {
    const malop = req.params.malop;
    const sem = JSON.stringify(req.params.sem);
    const classify = req.params.classify;

    await Sinhvien.findAll({
        where: {
            malop: req.params.malop,
        },
        include: [
            {
                model: Bangdiem,
                where: {
                    mssv: Sequelize.col('sinhvien.mssv'),
                },

                required: false
            }
        ],
        attributes: ['mssv', 'hoten', 'ngaysinh', 'malop']
    }).then(rows => {
        let students = [];

        //Get all students information and push them to an array 
        rows.forEach((row) => {
            let tmp = JSON.stringify(row.bangdiem.hocky);

            if (!sem.includes("all")) {
                if (classify == 1) {
                    if (sem == tmp && row.bangdiem.gpa >= 3.2) {
                        studentPush(students, row.mssv, row.hoten, row.ngaysinh, malop, row.bangdiem.hocky, row.bangdiem.tinchi, row.bangdiem.gpa, row.bangdiem.canhbaohocvu);
                    }
                }
                else if (classify == 2) {
                    if (sem == tmp && row.bangdiem.canhbaohocvu == 'có') {
                        studentPush(students, row.mssv, row.hoten, row.ngaysinh, malop, row.bangdiem.hocky, row.bangdiem.tinchi, row.bangdiem.gpa, row.bangdiem.canhbaohocvu);
                    }
                }
                else if (classify == 3) {
                    if (sem == tmp && row.bangdiem.tinchi < 13) {
                        studentPush(students, row.mssv, row.hoten, row.ngaysinh, malop, row.bangdiem.hocky, row.bangdiem.tinchi, row.bangdiem.gpa, row.bangdiem.canhbaohocvu);
                    }
                }
                else {
                    if (sem == tmp) {
                        studentPush(students, row.mssv, row.hoten, row.ngaysinh, malop, row.bangdiem.hocky, row.bangdiem.tinchi, row.bangdiem.gpa, row.bangdiem.canhbaohocvu);
                    }
                }
            }
            else {
                if (classify == 1) {
                    if (row.bangdiem.gpa >= 3.2) {
                        studentPush(students, row.mssv, row.hoten, row.ngaysinh, malop, row.bangdiem.hocky, row.bangdiem.tinchi, row.bangdiem.gpa, row.bangdiem.canhbaohocvu);
                    }
                }
                else if (classify == 2) {
                    if (row.bangdiem.canhbaohocvu == 'có') {
                        studentPush(students, row.mssv, row.hoten, row.ngaysinh, malop, row.bangdiem.hocky, row.bangdiem.tinchi, row.bangdiem.gpa, row.bangdiem.canhbaohocvu);
                    }
                }
                else if (classify == 3) {
                    if (row.bangdiem.tinchi < 13) {
                        studentPush(students, row.mssv, row.hoten, row.ngaysinh, malop, row.bangdiem.hocky, row.bangdiem.tinchi, row.bangdiem.gpa, row.bangdiem.canhbaohocvu);
                    }
                }
                else {
                    studentPush(students, row.mssv, row.hoten, row.ngaysinh, malop, row.bangdiem.hocky, row.bangdiem.tinchi, row.bangdiem.gpa, row.bangdiem.canhbaohocvu);
                }
            
            }

        });

        //Create a excel worksheet
        let excelFileName = malop;
        const workbook = new excel.Workbook();
        const worksheet = workbook.addWorksheet(excelFileName);

        //Create excel first row
        worksheet.columns = [
            { header: "Mssv", key: "mssv", width: 10 },
            { header: "Họ tên", key: "hoten", width: 30 },
            { header: "Ngày sinh", key: "ngaysinh", width: 15 },
            { header: "Mã lớp", key: "malop", width: 15 },
            { header: "Học kỳ", key: "hocky", width: 40 },
            { header: "Tín chỉ", key: "tinchi", width: 10 },
            { header: "GPA", key: "gpa", width: 10 },
            { header: "Cảnh báo học vụ", key: "canhbaohocvu", width: 20 },
        ];

        //Add array students to excel sheet
        worksheet.addRows(students);

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + excelFileName + ".xlsx"
        );


        //Use Workbook.xlsx.write() to write out Stream as response
        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    })


};

function studentPush(students, mssv, hoten, ngaysinh, malop, hocky, tinchi, gpa, canhbaohocvu) {
    students.push({
        mssv: mssv,
        hoten: hoten,
        ngaysinh: ngaysinh,
        malop: malop,
        hocky: hocky,
        tinchi: tinchi,
        gpa: gpa,
        canhbaohocvu: canhbaohocvu,
    })
}
module.exports = {
    upload: upload,
    exportExcel: exportExcel,
    exportHoctap: exportHoctap,
};