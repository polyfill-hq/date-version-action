import { exec } from 'child_process';

export function runShellCommand(command: string) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (stdout) {
        process.stdout.write(stdout);
      }

      if (stderr) {
        process.stderr.write(stderr);
      }

      if (error) {
        reject(error);
      } else {
        resolve(stdout || stderr);
      }
    });
  });
}
