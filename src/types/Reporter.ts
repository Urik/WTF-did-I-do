import { CommitLog } from "./CommitLog";

export type Reporter = (commitLogs: CommitLog[]) => Promise<string>;
