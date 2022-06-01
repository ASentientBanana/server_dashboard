import sqlite3, { Database } from 'sqlite3';
import getConfig from 'next/config'
import queries from './definitions/queries';
import bcrypt from 'bcrypt';
import { AuthUserDBResponse, User } from '../types/user';

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

  private static _queryAdapter(db: sqlite3.Database, resolver: (param: any) => void, reject: (reason?: any) => void): { [index: string]: any } {
    const cb = (err: Error, result?: any) => {
      if (err) reject(err)
      else resolver(result)
    }
    return {
      run: (command: string) => db.run(command, cb),
      get: (command: string) => db.get(command, cb),
      all: (command: string) => db.all(command, cb),
    }
  }

  private static async _query(db: sqlite3.Database, command: string, method: string) {
    return new Promise((resolve, reject) => {
      const queryMethods = DBAdapter._queryAdapter(db, resolve, reject);
      if (Object.keys(queryMethods).includes(method)) {
        queryMethods[method](command)
      } else {
        reject("Unsupported method");
      }
    });
  }

  static async query<T>(command: string, method: string = 'all'): Promise<T> {
    const db = await DBAdapter._openConnection();
    try {
      const queryResults = await DBAdapter._query(db, command, method);
      db.close();
      return queryResults as T;
    } catch (error) {
      db.close()
      throw Error('Database query error')
    }
  }

  static async getUser(username: string) {
    const user = await DBAdapter.query<AuthUserDBResponse>(queries.GET_USER(username), 'get');
    return user;
  }

  static async getAllUsers() {
    const users = await DBAdapter.query<AuthUserDBResponse[]>(queries.GET_ALL_USERS, 'get');
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
