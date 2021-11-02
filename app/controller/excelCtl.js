const db = require("../models/index");

const readXlsxFile = require("read-excel-file/node");

const upload = async (req, res) => {
    try {
        //Get and check file upload from req.file
        if (req.file == undefined) {
            return res.status(400).send("Please upload an excel file!");
        }
    
    let path = __basedir + "/public/assets/uploads/" + req.file.filename;
        
        //Use read-excel-file to read Excel file in uploads folder, 
        //the data which is returned as rows will be changed to array
        readXlsxFile(path).then((rows) => {
        
            // skip header
        rows.shift();
  
        let students = [];
  
        rows.forEach((row) => {
            let student = {
                id: row[0],
                title: row[1],
                description: row[2],
                published: row[3],
            };
  
            tutorials.push(tutorial);
        });
  
        Tutorial.bulkCreate(tutorials)
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

//The getTutorials() function uses findAll() method to return all Tutorials stored in the database tutorials table.
const getTutorials = (req, res) => {
    Tutorial.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  };
  
  module.exports = {
    upload,
    getTutorials,
  };