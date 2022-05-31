import { NewUser } from "../../types/user";

const queries = {
  CREATE_TABLE: `CREATE TABLE IF NOT EXISTS 
  "User" ("id" INTEGER UNIQUE,
  "password" TEXT NOT NULL,
  "username"	TEXT NOT NULL UNIQUE,
  PRIMARY KEY("id" AUTOINCREMENT));`,
  GET_ALL_USERS: 'SELECT * FROM User;',
  GET_USER: (username: string) => `SELECT * FROM User WHERE username="${username}"`,
  CREATE_USER: ({ username, password }: NewUser) => `INSERT INTO "User" (username, password) VALUES ("${username}", "${password}")`,
  getUserPaths: (userID: string) => `SELECT * FROM	Paths INNER JOIN User ON Paths.user_id = User.id;`
}

export default queries;
