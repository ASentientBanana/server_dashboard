import { promises } from 'fs';
import paths from './definitions/paths';

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

  static async getFolderContents(folder: string | string[]): Promise<string[]> {
    const contents: string[] = []
    if (Array.isArray(folder)) {
      for (let i = 0; i < folder.length; i++) {
        const dirContents = await promises.readdir(folder[i]);
        contents.push(...dirContents);
      }
    } else {
      const dirContents = await promises.readdir(folder);
      contents.push(...dirContents);
    }
    return contents;
  }
}
