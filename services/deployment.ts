

import { serverRuntimeConfig } from "../next.config";
import Runner from "./runner";

interface IDepoloymentOptions {
  label: string,
  url: string,
  type: string
}

/*
 Model
  projectPath: neki path na fs 
  label: project nickname 
  status: eg. available if only in sites-available or enabled  if in sites-enabled
  
*/

/*
remote:
    clone project to location eg. /var/www/projectName or tmp location 
    execute build script 
    move build res to location on fs like /var/www/projectName
    save project info to the DB
    create nginx template in sites available 
    create nginx template in sites enabled 
*/
export const deployProject = async (options: IDepoloymentOptions) => {

  // Later on add test/check if it exists 
  await Runner.runScript('bash', [
    `${serverRuntimeConfig?.baseDir}/scripts/shared/clone.sh`,
    options.url,
    `${serverRuntimeConfig?.baseDir}/tmp/${options.label}`,
  ]);

  await Runner.runScript('bash', [
    `${serverRuntimeConfig?.baseDir}/scripts/deployment/${options.type}.sh`,
  ]);



};
