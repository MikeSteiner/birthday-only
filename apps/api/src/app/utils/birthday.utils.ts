import * as crypto from 'crypto';

export function birthdayUniqueKey(
  name: string,
  birthDay: number,
  birthMonth: number,
): string {
  return crypto
    .createHash('sha1')
    .update(`${name.toLowerCase().trim()}:${birthDay}:${birthMonth}`)
    .digest('hex');
}
