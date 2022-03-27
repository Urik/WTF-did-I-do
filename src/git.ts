import simpleGit from 'simple-git';
import { CommitLog } from './types/CommitLog';

export async function getCommits(fromDate: Date, toDate: Date, author: string, path: string): Promise<CommitLog[]> {
  const logs = await simpleGit(path).log([
    '--after', fromDate.toISOString(),
    '--before', toDate.toISOString(),
    '--author', author,
  ]);

  return logs.all.map(log => ({
    body: log.body,
    date: log.date,
    message: log.message,
    repository: path,
    author: log.author_email
  }));
}
