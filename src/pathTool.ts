import * as fs from 'fs/promises';
import * as path from 'path';

// Returns subpaths of a path (including the path) for which predicate is true
export async function findGitRepos(folderPath: string): Promise<string[]> {
  async function _traverse(folderPath: string, filteredInPaths: string[]): Promise<string[]> {
    const pathContent = await fs.readdir(folderPath, { withFileTypes: true });
    const folderNames = pathContent.filter(content => content.isDirectory()).map(content => content.name);
    if (folderNames.some(subPath => subPath === '.git')) {
      return filteredInPaths.concat(folderPath)
    } else {
      const subPathsResults = [];
      for (const folderName of folderNames) {
        const subPath = path.join(folderPath, folderName);
        const results = await _traverse(subPath, []);
        subPathsResults.push(...results);
      }
      return filteredInPaths.concat(subPathsResults);
    }
  }

  return _traverse(folderPath, []);
}
