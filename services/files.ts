import { promises } from 'fs';
import paths from './definitions/paths';
import { File } from '../types/file';

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

  static async getFolderContents(folder: string | string[]): Promise<File[]> {
    const contents: File[] = []
    if (Array.isArray(folder)) {
      for (let i = 0; i < folder.length; i++) {
        const dirContents = await promises.readdir(folder[i], { withFileTypes: true });
        for (let j = 0; j < dirContents.length; j++) {
          if (dirContents[j].isFile()) {
            const path = `${folder[i]}${dirContents[j].name}`;
            // const _file = await promises.readFile(path)
            contents.push({ name: dirContents[j].name, path });
          }
        }
        // const files = dirContents.map(async fileName => await promises.readFile(`${folder[i]}/${fileName}`))
      }
    } else {
      // TODO 
      const dirContents = await promises.readdir(folder);
      contents.push({ name: '', path: '' });
    }
    return contents;
  }
}
