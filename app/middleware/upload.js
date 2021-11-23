const multer = require("multer");
const path = require('path');


//Định nghĩa bộ lọc để nhận duy nhất file excel
const excelFilter = (req, file, cb) => {
    if (
        file.mimetype.includes("excel") ||
        file.mimetype.includes("spreadsheetml")
    ){
        cb(null, true);
    } else {
        cb("Please upload only excel file.", false);
    }
  };

// Cấu hình multer để sử dụng Disk Storage egine để lưu file excel
const excelStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRoot + '/public/assets/uploads/');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});

//configure multer to use Disk Storage engine to save image
// Cấu hình multer để sử dụng Disk Storage egine để lưu ảnh
const imgStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, appRoot + '/public/assets/img/avatar/');
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, file.originalname);
    },
});
  
  var uploadFile = multer({ storage: excelStorage, fileFilter: excelFilter });
  module.exports = uploadFile;