const db = require("../models/index");
const Covan = db.Covan;

const deleteTeacher = async (req, res) => {
    const a = await Covan.findByPk(req.params.email);
    await a.destroy();
    res.redirect('/my');
}

const user = {
    deleteTeacher: deleteTeacher,
}

module.exports = user;