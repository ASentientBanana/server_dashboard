import { spawn, exec } from "child_process";


export default class Runner {
  static async runScript(scriptName: string, args: string[]) {
    const result = await new Promise((res) => {
      const r = exec(`${scriptName} ${args.join(' ')}`, (error, stdout, stderr) => {
        console.log(stdout);
      })
      res(r);
    });
    return result;
  }
};
