import * as core from '@actions/core';
import { format } from 'date-fns';
import { Commit, getLastCommit } from 'git-last-commit';

function getCommit():Promise<Commit> {
  return new Promise((resolve, reject) => {
    getLastCommit((err, commit) => {
      if (err) {
        return reject(err);
      }

      return resolve(commit);
    });
  });
}

export async function getVersion(versionFormat: string = 'yy.MM.dd', buildFormat: string = 'HHmmss') {
  const commit = await getCommit();

  core.info('getting latest commit ...'); // debug is only output if you set the secret `ACTIONS_STEP_DEBUG` to true

  core.info(JSON.stringify(commit));

  const date = new Date(parseInt(commit.committedOn) * 1000);

  const ver = format(date, versionFormat);
  const build = format(date, buildFormat);

  return {
    ver,
    build,
    full: `${ver}.${build}`,
    shortHash: commit.shortHash,
    branch: commit.branch,
  };
}
