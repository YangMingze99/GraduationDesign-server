const md5 = require("md5");

function getMd5(password , salt){
    return md5(md5(password)+salt);
};

module.exports = {
    getMd5:getMd5
}