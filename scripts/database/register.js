const { argv } = require('process');
const sql = require('sqlite3');
const config = require('../../next.config');
const bcrypt = require('bcrypt');

// Argument order: username, password 
const REGISTER_USER = ({ username, password }) => `INSERT INTO "User" (username, password) VALUES ("${username}", "${password}")`;

const generatePassword = async (password) => {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    return passwordHash;
}

(async function () {
    const args = argv.slice(2);
    const username = args[0];
    const password = args[1];
    const passwordHash = await generatePassword(password)
    const baseDir = config.serverRuntimeConfig.baseDir;
    const db = new sql.Database(`${baseDir}/db.sqlite`)
    db.run(REGISTER_USER({ password: passwordHash, username }), (res, err) => {
        if (err) throw err;
    });
})()