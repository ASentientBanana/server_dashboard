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

  CREATE_PROJECT: ({ name, location, type, isLocal, userID }: NewProject) => `INSERT INTO "Projects" (project_name, project_location, project_type, is_local,user_id ) VALUES ("${name}", "${location}","${type}", "${isLocal ? 1 : 0}","${userID}");`,

  CHANGE_PASSWORD: (password: string, id: string) => `UPDATE User SET password = "${password}" WHERE id = ${id};`,

  GET_ALL_PROJECTS: () => `SELECT * FROM "Paths"`,

  GET_PROJECTS_IF_LOCAL: (isLocal: boolean, userID: string) => `SELECT * FROM "Projects" WHERE is_local=${isLocal} AND user_id=${userID};`,

  GET_PROJECT_BY_ID: (ID: string) => `SELECT * FROM "Projects" WHERE id=${ID};`
}
// GET_PROJECTS_IF_LOCAL: (isLocal: boolean, userID: string) => `SELECT * FROM Projects INNER JOIN Paths ON Projects.id = Paths.project_id WHERE is_local=${isLocal} AND Projects.user_id=${userID};`
// **OLD
export default queries;
