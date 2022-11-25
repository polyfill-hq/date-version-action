import { format } from 'date-fns';
import { getLastCommit } from 'git-last-commit';

export function getVersion(versionFormat: string = 'yy.MM.dd', buildFormat: string = 'HHmmss'): Promise<{ ver: string, build: string, full: string }> {
  return new Promise((resolve, reject) => {
    getLastCommit((err, commit) => {
      if (err) {
        return reject(err);
      }

      const date = new Date(parseInt(commit.committedOn) * 1000);

      const ver = format(date, versionFormat);
      const build = format(date, buildFormat);

      return resolve({
        ver,
        build,
        full: `${ver}.${build}`,
      });
    });
  });
}
