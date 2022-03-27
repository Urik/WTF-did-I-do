import simpleGit from 'simple-git';
import { CommitLog } from './types/CommitLog';

export async function getCommits(fromDate: Date, toDate: Date, author: string, path: string): Promise<CommitLog[]> {
  try {
    const logs = await simpleGit(path).log([
      '--after', fromDate.toISOString(),
      '--before', toDate.toISOString(),
      '--author', author,
    ]);

    return logs.all.map(log => ({
      date: log.date,
      author: log.author_email,
      repository: path,
      message: log.message,
      body: log.body,
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
