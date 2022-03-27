#!/usr/bin/env node

import yargs from 'yargs';
import { getCommits } from './git';
import { findGitRepos } from './pathTool';
import { ReporterTypes, getReporter } from './reporters';
import { CommitLog } from './types/CommitLog';

function sortCommitLogs(commitLogs: CommitLog[]): CommitLog[] {
  return commitLogs.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    const areSameDay =
      dateA.getUTCFullYear() === dateB.getUTCFullYear() &&
      dateA.getUTCMonth() === dateB.getUTCMonth() &&
      dateA.getUTCDate() === dateB.getUTCDate();

    if (!areSameDay) {
      return dateA.getTime() - dateB.getTime();
    }

    return a.repository.localeCompare(a.repository);
  });
}

async function doWork() {
  const argv = await yargs(process.argv.slice(2))
  .usage('Usage: $0 -w [num] -h [num]')
  .positional('from', {
    type: 'string',
    desc: 'An ISO 8061 date string of since when to look for commits',
    demandOption: true,
  })
  .positional('until', {
    type: 'string',
    desc: 'An ISO 8061 date string until to look for commits',
    default: new Date().toISOString(),
  })
  .positional('author', {
    type: 'string',
    desc: 'Email of the commit\'s author',
    default: process.env.GIT_AUTHOR,
  })
  .positional('format', {
    type: 'string',
    desc: 'Format to use for the report',
    alias: 'reporter',
    default: ReporterTypes.CSV,
    choices: Object.values(ReporterTypes),
  })
  .demandOption('from', 'Specify when you want to start looking for commits from')
  .demandOption('author', 'Specify for whom you want to see the commits')
  .help().argv;

  const gitReposPaths = await findGitRepos(process.cwd());
  const commitLogs: CommitLog[] = [];
  for (const gitRepoPath of gitReposPaths) {
    const commitsLogs = await getCommits(new Date(argv.from), new Date(argv.until), argv.author, gitRepoPath);
    commitLogs.push(...commitsLogs);
  }

  const sortedLogs = sortCommitLogs(commitLogs);
  const reporter = getReporter(argv.format);

  console.log(await reporter(sortedLogs));
}

doWork();
