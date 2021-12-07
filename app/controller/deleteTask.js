const db = require("../models/index");
const Thongbao = db.Thongbao;

const deleteTask = async (req, res) => {
    const tb = await Thongbao.findByPk(req.params.id);
    const malop = req.params.malop;
    await tb.destroy();
    res.redirect(`/thong-bao/${malop}`);
}

const user = {
    deleteTask: deleteTask,
}

module.exports = user;