const db = require("../models/index");
const Sinhvien = db.Sinhvien;
const Covan = db.Covan;


//************************************************************************************************************************
//Lấy profile người dùng của sinh viên hoặc cố vấn
const getProfile = async (req, res) => {
    //Lấy tên đăng nhập và vai trò từ biến local tạo ra khi đăng nhập
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;

    
    console.log(userRole);
    let profile = '';
    //Lấy profile rồi gán vào object profile
    if(userRole == 'sinhvien'){
        profile = await Sinhvien.findByPk(username);
    }else if(userRole == 'covan'){
        profile = await Covan.findByPk(username);
    }
    console.log(profile.dataValues);
    //Render giao diện profile kèm dữ liệu
    res.render('profile', profile.dataValues);
}

const updateUserInfo = async(req, res) => {
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    const avatarPath = '/assets/img/avatar/' + req.file.filename;


    if(userRole == 'sinhvien'){
        studentProfile = await Sinhvien.findByPk(username);
        await studentProfile.update({
            hoten: req.body.hoten,
            email: req.body.email,
            ngaysinh: req.body.ngaysinh,
            sdt: req.body.sdt,
            //avatar: avatarPath
        });
        await studentProfile.save();
    }else if(userRole == 'covan'){
        advisorProfile = await Covan.findByPk(username);
        await advisorProfile.update({
            hoten: req.body.hoten,
            //email: req.body.email,
            ngaysinh: req.body.ngaysinh,
            sdt: req.body.sdt,
            //avatar: avatarPath
        });
        await advisorProfile.save();
    }
};


const uploadAvatar = async(req, res) => {
   
    const username = res.locals.user.tennguoidung;
    const userRole = res.locals.user.vaitro;
    let avatarPath = '/assets/img/avatar/' + req.file.filename;
    
    //Lưu ảnh vào db
    if(userRole == 'sinhvien'){
        profile = await Sinhvien.findByPk(username);
    }else if(userRole == 'covan'){
        profile = await Covan.findByPk(username);
    }
    await profile.update({avatar: avatarPath});
    await profile.save();

    res.redirect('/profile');
}



const user ={
    getProfile: getProfile,
    updateUserInfo: updateUserInfo,
    uploadAvatar: uploadAvatar,
}

module.exports = user;