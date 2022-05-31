const sql = require('sqlite3');
const config = require('../next.config');

const CREATE_TABLE = 'CREATE TABLE TABLE IF NOT EXISTS "User" ("id" INTEGER UNIQUE,"password"	TEXT NOT NULL,"username"	TEXT NOT NULL,PRIMARY KEY("id" AUTOINCREMENT));'

const baseDir = config.serverRuntimeConfig.baseDir;
new sql.Database(`${baseDir}/db.sqlite`).run(CREATE_TABLE, (err) => {
    if (err) throw err
})