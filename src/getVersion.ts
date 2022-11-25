import { format } from 'date-fns';
import { getLastCommit } from 'git-last-commit';

export function getVersion(fmt: string = 'yy.MM.dd.HH.mm.ss'): Promise<string> {
  return new Promise((resolve, reject) => {
    getLastCommit((err, commit) => {
      if (err) {
        return reject(err);
      }

      const date = new Date(parseInt(commit.committedOn) * 1000);

      const version = format(date, fmt);

      return resolve(version);
    });
  });
}
