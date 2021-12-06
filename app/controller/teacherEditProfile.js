const db = require("../models/index");
const Covan = db.Covan;

const teacherEditProfile = async (req, res) => {
    const a = await Covan.findByPk(req.params.email);
    a.hoten = req.body.hoten;
    a.sdt = req.body.sdt;
    await a.save();
    console.log('----------------------------------')
    console.log(req.body);
    return res.status(200).json({
        message: "success!"
    });
}

const user = {
    teacherEditProfile: teacherEditProfile,
}

module.exports = user;