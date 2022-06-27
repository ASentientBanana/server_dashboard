import { spawn, exec } from "child_process";


export default class Runner {

    static async runScript(scriptName: string, args: string[]) {

        const r = exec(`${scriptName} ${args.join(' ')}`, (error, stdout, stderr) => {
            console.log(stdout);
        })

    }
};
