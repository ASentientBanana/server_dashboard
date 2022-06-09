const sqlite = require('sqlite3');
const config = require('../../next.config');


const CREATE_USER_TABLE = `CREATE TABLE IF NOT EXISTS "User" (
    "id" INTEGER UNIQUE,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL, 
    PRIMARY KEY("id" AUTOINCREMENT));`

const CREATE_PROJECT_TABLE = `CREATE TABLE IF NOT EXISTS "Projects" (
    "id" INTEGER UNIQUE,
    "project_name" TEXT NOT NULL UNIQUE,
    "project_type" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "is_local" INT NOT NULL,
    "project_location" TEXT NOT NULL UNIQUE,
    PRIMARY KEY("id" AUTOINCREMENT));`

const CREATE_PATH_TABLE = `CREATE TABLE  IF NOT EXISTS "Paths" (
	"id"	INTEGER UNIQUE,
  "label" TEXT,
	"path"	TEXT NOT NULL,
	"user_id" TEXT NOT NULL,
	PRIMARY KEY("id" AUTOINCREMENT));`

const INSERT_DEFAULT_PATHS = `INSERT INTO "Paths" ( label, path, user_id) VALUES ( "default_path", "/var/www/server/", "1" );`

// Initial table creation if database doesn't contain it

const baseDir = config.serverRuntimeConfig.baseDir;

(async function() {
  const sql = sqlite.verbose();
  const db = new sql.Database(`${baseDir}/db.sqlite`, (err) => {
    if (err) {
      throw err
    }
  });
  db.serialize(() => {
    db.run(CREATE_USER_TABLE, (err) => {
      if (err !== null) throw err
    })
    db.run(CREATE_PROJECT_TABLE, (err) => {
      if (err !== null) throw err
    });
    db.run(CREATE_PATH_TABLE, (err) => {
      if (err !== null) throw err
    });
    db.run(INSERT_DEFAULT_PATHS, (err) => {
      if (err !== null) throw err
    });
    db.close()
  });
})();
