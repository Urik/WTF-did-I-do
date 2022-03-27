import * as csv from 'fast-csv';
import { CommitLog } from './types/CommitLog';
import { Reporter } from './types/Reporter';

export enum ReporterTypes {
  CSV = 'csv',
  JSON = 'json',
}

export function reportCsv(commitLogs: CommitLog[]) {
  return new Promise<string>(resolve => {
    const csvStream = csv.format({ headers: true });
    let csvStr = '';
    csvStream.on('data', (data => csvStr += data));
    csvStream.on('end', () => resolve(csvStr));

    for (const commitLog of commitLogs) {
      csvStream.write(commitLog);
    }
    csvStream.end();

  });
}

export async function reportJson(commitLogs: CommitLog[]): Promise<string> {
  const transformedLogs = commitLogs.map(commitLog => commitLog);

  return JSON.stringify(transformedLogs, null, 2);
}

export function getReporter(reporterName: ReporterTypes): Reporter {
  function assertCompletion(x: never): void {
    throw new Error(`Invalid reporter name ${reporterName}`);
  }

  switch (reporterName) {
    case ReporterTypes.CSV:
      return reportCsv;
    case ReporterTypes.JSON:
      return reportJson;
    default:
      assertCompletion(reporterName);
      break;
  }
}
