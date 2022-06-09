const sqlite = require('sqlite3');
const config = require('../../next.config');


const TRUNCATE_USER_TABLE = `DELETE FROM User;`

const TRUNCATE_PROJECT_TABLE = `DELETE FROM Projects;`

const TRUNCATE_PATH_TABLE = `DELETE FROM Paths;`
// TODO REMOVE PROJECT ID
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
    db.run(TRUNCATE_USER_TABLE, (err) => {
      if (err !== null) throw err
    })
    db.run(TRUNCATE_PROJECT_TABLE, (err) => {
      if (err !== null) throw err
    });
    db.run(TRUNCATE_PATH_TABLE, (err) => {
      if (err !== null) throw err
    });
    db.close()
  });
})();

