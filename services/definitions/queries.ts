import { NewProject } from "../../types/project";
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
  CREATE_PROJECT: ({ name, location, type, userID }: NewProject) => `INSERT INTO "Projects" (name, location, type, user_id ) VALUES ("${name}", "${location}","${type}")"${userID}"`,
  CHANGE_PASSWORD: (password: string, id: string) => `UPDATE User SET password = "${password}" WHERE id = ${id};`

}

export default queries;
