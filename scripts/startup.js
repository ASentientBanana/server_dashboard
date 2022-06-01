const sqlite = require('sqlite3');
const config = require('../next.config');


const CREATE_USER_TABLE = 'CREATE TABLE IF NOT EXISTS "User" ("id" INTEGER UNIQUE,"password" TEXT NOT NULL,"username" TEXT NOT NULL, PRIMARY KEY("id" AUTOINCREMENT));'
const CREATE_PROJECT_TABLE = 'CREATE TABLE IF NOT EXISTS "Projects" ("id" INTEGER UNIQUE,"project_name" TEXT NOT NULL,"project_type" TEXT NOT NULL,"project_location" TEXT NOT NULL,PRIMARY KEY("id" AUTOINCREMENT));'

// Initial table creation if database doesn't contain it
const baseDir = config.serverRuntimeConfig.baseDir;

(async function () {
    const sql = sqlite.verbose();
    const db = new sql.Database(`${baseDir}/db.sqlite`, (err) => {
        if (err) {
            console.log("OPEN CONNECTION ERR");
            throw err
        }
    })
    db.serialize(() => {
        db.run(CREATE_USER_TABLE, (err) => {
            console.log("1");
            if (err !== null) throw err
            console.log("2");
        })
        db.run(CREATE_PROJECT_TABLE, (err) => {
            console.log("3");
            if (err !== null) throw err
            console.log("4");
        });
        db.close()
    });
})();
