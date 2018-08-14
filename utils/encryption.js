const bcrypt = require('bcrypt');
const config = require('../configurations/config');

let getEncryptedPasswordWithSalt = function (password) {
    let salt = config.get('salt');
    let passwordHashWithSalt = bcrypt.hashSync(password, salt);
    let passwordHash = passwordHashWithSalt.substring(29);
    return passwordHash;
};

module.exports = {
    getEncryptedPasswordWithSalt: getEncryptedPasswordWithSalt
}