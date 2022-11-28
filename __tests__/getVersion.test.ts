
import { expect, test } from '@jest/globals';

import { getVersion } from '../src/getVersion';

test('getVersion', async () => {
  const version = await getVersion(new Date());
  expect(version.ver).toMatch(/^2\d\.\d{2}\.\d{2}$/);
  expect(version.build).toMatch(/^\d{6}$/);
  expect(version.full).toBe(`${version.ver}.${version.build}`);
});


// Mock with https://github.com/actions/toolkit/blob/master/packages/github/src/context.ts
// shows how the runner will run a javascript action with env / stdout protocol
// test('test runs', () => {
//   process.env.INPUT_MILLISECONDS = '500';
//   const np = process.execPath;
//   const ip = path.join(__dirname, '..', 'lib', 'main.js');
//
//   runShellCommand(`${np} ${ip}`);
// });
