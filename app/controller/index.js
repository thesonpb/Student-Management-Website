const auth = require('./auth');
const user = require('./userInfo')
const profile = require('./profile');
module.exports = {
    login : auth.login,
    logout: auth.logout,
    getUserInfo: user.getUserInfo,
    getProfile: profile.getProfile,
}