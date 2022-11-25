import * as core from '@actions/core';

import { getVersion } from './getVersion';

async function run(): Promise<void> {
  try {
    const version = await getVersion();
    core.debug(new Date().toTimeString());

    core.setOutput('version', version.ver);
    core.setOutput('build', version.build);
    core.setOutput('full_version', version.full);
    core.setOutput('short_hash', version.shortHash);
    core.setOutput('branch', version.branch);
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message);
  }
}

void run();
