const multer = require("multer");



//Define a filter to only allow file with excel format.
const excelFilter = (req, file, cb) => {
    if (
      file.mimetype.includes("excel") ||
      file.mimetype.includes("spreadsheetml")
    ) {
      cb(null, true);
    } else {
      cb("Please upload only excel file.", false);
    }
  };

//configure multer to use Disk Storage engine.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log(__basedir);
        cb(null, __basedir + "/public/assets/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    },
  });
  
  var uploadFile = multer({ storage: storage, fileFilter: excelFilter });
  module.exports = uploadFile;