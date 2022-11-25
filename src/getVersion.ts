import { format } from 'date-fns';

export async function getVersion(timeStamp: Date, versionFormat: string = 'yy.MM.dd', buildFormat: string = 'HHmmss') {
  // const commit = await getCommit();

  // core.info(JSON.stringify(commit));

  // const date = new Date(parseInt(commit.committedOn) * 1000);

  console.log('Commit timestamp: ', timeStamp);
  const ver = format(timeStamp, versionFormat);
  const build = format(timeStamp, buildFormat);

  return {
    ver,
    build,
    full: `${ver}.${build}`,
  };
}
