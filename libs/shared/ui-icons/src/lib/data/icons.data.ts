import { BELL_ALERT_Solid_24x24 } from '../icons/bell-alert';
import { CAKE_24x24 } from '../icons/cake';
import { pencilSquare_Solid_24x24 } from '../icons/pencil-square';
import { phoneArrowUpRight_Solid_24x24 } from '../icons/phone-arrow-up-right_-solid_24x24';
import { PLUS_SOLID_24x24 } from '../icons/plus';
import { PLUS_CIRCLE_SOLID_24x24 } from '../icons/plus-circle';
import { ROCKET_LAUNCH_SOLID_24x24 } from '../icons/rocket-launch';
import { TRASH_24x24 } from '../icons/trash';
import { xMark_Solid_24x24 } from '../icons/x-mark';

export const BIRTHDAY_ICONS = {
  ['plus-circle']: PLUS_CIRCLE_SOLID_24x24,
  plus: PLUS_SOLID_24x24,
  ['rocket-launch']: ROCKET_LAUNCH_SOLID_24x24,
  ['bell-alert']: BELL_ALERT_Solid_24x24,
  ['cake']: CAKE_24x24,
  ['pencil-square']: pencilSquare_Solid_24x24,
  ['phone-arrow-up']: phoneArrowUpRight_Solid_24x24,
  ['trash']: TRASH_24x24,
  ['x-mark']: xMark_Solid_24x24
} as const;

export type IconName = keyof typeof BIRTHDAY_ICONS;