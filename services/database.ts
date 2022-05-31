import sqlite3 from 'sqlite3';
import getConfig from 'next/config'
import queries from './definitions/queries';
import bcrypt from 'bcrypt';
import { AuthRegisterUserResponse, AuthUserDBResponse } from '../types/user';

const conf = getConfig();
const DATABASE_PATH = `${conf.serverRuntimeConfig.baseDir}/db.sqlite`;

export class DBAdapter {

  private static async openConnection(): Promise<sqlite3.Database> {
    const sql = sqlite3.verbose();
    const db = new sql.Database(DATABASE_PATH);
    return await new Promise((res) => {
      db.run(queries.CREATE_TABLE, (err) => {
        console.log('runin');
        if (err) throw err
        res(db)
      })
      res(db)
    })
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

  static async query(command: string, method: string = 'all') {
    const db = await DBAdapter.openConnection()
    return new Promise(async (resolve) => {
      db.serialize(async () => {
        const res: any = await DBAdapter._query(db, command, method)
        db.close();
        resolve(res)
      })
    })
  }

  static async getUser(username: string) {
    const user = await DBAdapter.query(queries.GET_USER(username), 'get');
    return user as { username: string, id: string, password: string };
  }

  static async getAllUsers() {
    const users = await DBAdapter.query(queries.GET_ALL_USERS, 'get');
    return users;
  }

  static async createUser(username: string, password: string) {
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt)
    await DBAdapter.query(queries.CREATE_USER({ username, password: passwordHash }), 'get');
    const user = await DBAdapter.query(queries.GET_USER(username), 'get') as AuthUserDBResponse
    return { username: user.username, id: user.id, password };
  }
}

