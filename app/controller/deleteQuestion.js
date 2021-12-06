const db = require("../models/index");
const Cauhoi = db.Cauhoi;
const Cautraloi = db.Cautraloi;

const deleteQuestion = async (req, res) => {
    const ques = await Cauhoi.findByPk(req.params.macauhoi);
    const malop = ques.malop;
    await ques.destroy();
    await Cautraloi.destroy({ where: { macauhoi: req.params.macauhoi } });
    res.redirect(`/dien-dan/${malop}`);
}

const user = {
    deleteQuestion: deleteQuestion,
}

module.exports = user;