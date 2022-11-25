import * as cp from 'child_process';
import * as path from 'path';
import * as process from 'process';

import { expect, test } from '@jest/globals';

import { getVersion } from '../src/getVersion';

test('getVersion', async () => {
  const version = await getVersion();
  expect(version.ver).toMatch(/^2\d\.\d{2}\.\d{2}$/);
  expect(version.build).toMatch(/^\d{6}$/);
  expect(version.full).toBe(`${version.ver}.${version.build}`);
  expect(version.shortHash).toMatch(/^[0-9a-f]{7}$/);
  expect(version.branch).toBeDefined();
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
