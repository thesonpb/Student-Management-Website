exports.studentContent = (req, res) => {
    console.log('Student Content');
    console.log(res.local.user);
    res.status(200).send("Student Content.");
};

exports.lecturerContent = (req, res) => {
    res.status(200).send("Lecturer Content.");
};