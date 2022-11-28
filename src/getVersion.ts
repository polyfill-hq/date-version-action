import { format } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

export async function getVersion(timeStamp: string, versionFormat: string = 'yy.MM.dd', buildFormat: string = 'HHmmss') {
  const pst = utcToZonedTime(timeStamp, 'America/Vancouver');

  console.log('Commit timestamp: ', pst);
  const ver = format(pst, versionFormat);
  const build = format(pst, buildFormat);

  return {
    ver,
    build,
    full: `${ver}.${build}`,
  };
}
