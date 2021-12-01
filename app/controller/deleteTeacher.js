const db = require("../models/index");
const Covan = db.Covan;
const Taikhoan = db.Taikhoan;

const deleteTeacher = async (req, res) => {
    const a = await Covan.findByPk(req.params.email);
    await a.destroy();
    const acc = await Taikhoan.findByPk(req.params.email);
    await acc.destroy();
    res.redirect('/my');
}

const user = {
    deleteTeacher: deleteTeacher,
}

module.exports = user;