import { exec } from 'child_process';

import * as core from '@actions/core';
import { context } from '@actions/github';

import { getVersion } from './getVersion';

async function run(): Promise<void> {
  try {
    const updatePackageJson = String(core.getInput('updatePackageJson')).toLowerCase() === 'true';
    core.info(JSON.stringify(context));
    const timeStamp : string = context.payload.head_commit.timestamp;
    const version = await getVersion(timeStamp);
    core.info(`Version: ${version}`);

    core.setOutput('version', version.ver);
    core.setOutput('build', version.build);
    core.setOutput('full_version', version.full);

    // core.setOutput('short_hash', version.shortHash);
    // core.setOutput('branch', version.branch);

    if (updatePackageJson) {
      exec(`npm version --no-git-tag-version ${version.ver}-${version.build}`, (error, stdout, stderr) => {
        if (error) {
          core.error(`error: ${error.message}`);
          core.setFailed(error.message);
        }
        if (stderr) {
          core.error(`stderr: ${stderr}`);
          core.setFailed(stderr);
        }
        core.debug(`stdout: ${stdout}`);
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      core.setFailed(error.message);
    } else {
      core.setFailed(error as any);
    }
  }
}

void run();
