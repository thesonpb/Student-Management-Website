const db = require("../models/index");
const Cauhoi = db.Cauhoi;
const Cautraloi = db.Cautraloi;

const deleteAnswer = async (req, res) => {
    const ans = await Cautraloi.findByPk(req.params.macautraloi);
    const ques = await Cauhoi.findByPk(ans.macauhoi);
    const malop = ques.malop;
    await ans.destroy();
    res.redirect(`/dien-dan/${malop}`);
}

const user = {
    deleteAnswer: deleteAnswer,
}

module.exports = user;