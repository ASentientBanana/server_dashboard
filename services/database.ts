import sqlite3 from 'sqlite3';
import getConfig from 'next/config'
import queries from './definitions/queries';
import bcrypt from 'bcrypt';
import { AuthUserDBResponse } from '../types/user';

const conf = getConfig();
const DATABASE_PATH = `${conf.serverRuntimeConfig.baseDir}/db.sqlite`;

export class DBAdapter {

  private static async _openConnection(): Promise<sqlite3.Database> {
    const sql = sqlite3.verbose();
    const db = new sql.Database(DATABASE_PATH);
    return await new Promise((res) => {
      db.run(queries.CREATE_TABLE, (err) => {
        if (err) throw err
        res(db)
      })
      res(db)
    })
  }

  private static async _query(db: sqlite3.Database, command: string, method: string) {
    return new Promise((resolve, reject) => {
      //@ts-ignore Ignoring the type error cant index database with type string
      db[method](command, (error: Error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }

  static async query(command: string, method: string = 'all') {
    const db = await DBAdapter._openConnection();
    const queryResults = await DBAdapter._query(db, command, method);
    db.close();
    return queryResults;
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
    const db = await DBAdapter._openConnection();
    await DBAdapter._query(db, queries.CREATE_USER({ username, password: passwordHash }), "get");
    const user = await DBAdapter._query(db, queries.GET_USER(username), 'get') as AuthUserDBResponse
    db.close()
    return { username: user.username, id: user.id, password };
  }
}

