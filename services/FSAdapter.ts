import { promises } from 'fs';
import paths from './definitions/paths';
import { DirectoryStructure, File, DirStruct } from '../types/file';
import getConfig from 'next/config';
import { fileURLToPath } from 'url';

const baseDir = getConfig().serverRuntimeConfig.baseDir as string;


export class Files {
  static async getNGINXSites() {
    // const res = await promises.stat('/home/petar/Downloads/')
    const availableSites = await promises.readdir(paths.SITES_AVAILABLE);
    const enabledSites = await promises.readdir(paths.SITES_ENABLED);
    return {
      available: availableSites,
      enabled: enabledSites
    }
  }

  static async getFolderContents(folders: string[], showFiles: boolean = false): Promise<File[]> {
    const contents: File[] = []
    if (Array.isArray(folders)) {
      for (let i = 0; i < folders.length; i++) {
        const dirContents = await promises.readdir(folders[i], { withFileTypes: true });
        for (let j = 0; j < dirContents.length; j++) {
          let path = '';
          if (showFiles === dirContents[j].isFile()) {
            // const _file = await promises.readFile(path)
            path = `${folders[i]}/${dirContents[j].name}`;
            contents.push({ name: dirContents[j].name, path, type: String(showFiles === dirContents[j].isFile()) });
          }
        }
        // const files = dirContents.map(async fileName => await promises.readFile(`${folder[i]}/${fileName}`))
      }
    }
    return contents;
  }

  static async getDeploymentScripts(): Promise<File[]> {
    const deploymentScripts = await Files.getFolderContents([`${baseDir}/scripts/deployment/`], true)

    return deploymentScripts;
  }

  static async getFolderContentsRecursive(basePath: string): Promise<any[]> {
    const _contents = [];
    const dirContents = await promises.readdir(basePath, { withFileTypes: true });
    for (let i = 0; i < dirContents.length; i++) {
      if (dirContents[i].isDirectory()) {
        const contents = await Files.getFolderContentsRecursive(`${basePath}/${dirContents[i].name}`);
        _contents.push({
          name: dirContents[i].name,
          contents
        })
      } else {
        _contents.push({
          name: dirContents[i].name,
          contents: null
        })
      }
    }

    return _contents.sort((a, b) => a.contents !== null ? 0 : -1);
  }

  static async loadDeploymentArgs(deployment: string) {
    const file = await promises.readFile(`${baseDir}/scripts/deployment/${deployment}.sh`, { encoding: 'utf-8' });
    const separatedFile = file.split('\n');
    let argString = ''
    for (let index = 0; index < separatedFile.length; index++) {
      if (separatedFile[index].slice(0, 5) === '#args') {
        argString = separatedFile[index];
        break;
      }
    }

    return argString.split(' ').slice(1).filter(arg => { if (arg) return arg });

  }
}
