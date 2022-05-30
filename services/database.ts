import sqlite3 from 'sqlite3';
import getConfig from 'next/config'
import queries from './definitions/queries';

const conf = getConfig();
const DATABASE_PATH = `${conf.serverRuntimeConfig.baseDir}/db.sqlite`;

export class DBAdapter {

  private static openConnection() {
    const sql = sqlite3.verbose();
    return new sql.Database(DATABASE_PATH);
  }

  private static async _query(db: sqlite3.Database, command: string, method: string) {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      db[method](command, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static query(command: string, method: string = 'all') {
    const db = DBAdapter.openConnection()
    return new Promise(async (resolve) => {
      db.serialize(async () => {
        const res: any = await DBAdapter._query(db, command, method)
        db.close();
        resolve(res)
      })
    })
  }

  static async CreateTable() { // TODO: Improve its not called anywhere currently
    new sqlite3.Database(DATABASE_PATH,
      sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
      (err) => {
        DBAdapter.openConnection().run(queries.CREATE_TABLE, (err) => {
          if (err) {
            console.log("Database creation error");
            throw err
          }
        }).close()
      });
  }
  static async getUser(username: string) {
    const user = await DBAdapter.query(queries.GET_USER(username), 'get');
    return user as { username: string, id: string, password: string };
  }
  static async getAllUsers() {
    const users = await DBAdapter.query(queries.GET_ALL_USERS, 'get');
    return users;
  }
}

