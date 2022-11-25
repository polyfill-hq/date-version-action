import * as cp from 'child_process';
import * as path from 'path';
import * as process from 'process';

import { expect, test } from '@jest/globals';

import { getVersion } from '../src/getVersion';

test('wait 500 ms', async () => {
  const version = await getVersion();
  expect(version).toMatch(/^2\d\.\d{2}\.\d{2}\.\d{2}\.\d{2}\.\d{2}$/);
});

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env.INPUT_MILLISECONDS = '500';
  const np = process.execPath;
  const ip = path.join(__dirname, '..', 'lib', 'main.js');
  const options: cp.ExecFileSyncOptions = {
    env: process.env,
  };
  console.log(cp.execFileSync(np, [ip], options).toString());
});
