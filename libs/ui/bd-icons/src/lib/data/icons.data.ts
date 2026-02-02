import { BELL_ALERT_SOLID_24x24  } from '../icons/bell-alert';
import { CAKE_24x24 } from '../icons/cake';
import { CHEVRON_DOWN_SOLID_24x24 } from '../icons/chevron-down.icon';
import { CHEVRON_LEFT_SOLID_24x24 } from '../icons/chevron-left.icon';
import { CHEVRON_RIGHT_SOLID_24x24 } from '../icons/chevron-right.icon';
import { CHEVRON_UP_SOLID_24x24 } from '../icons/chevron-up.icon';
import { PENCIL_SQUARE_SOLID_24x24 } from '../icons/pencil-square';
import { PHONE_ARROW_UP_RIGHT_SOLID_24x24 } from '../icons/phone-arrow-up-right_solid_24x24';
import { PLUS_SOLID_24x24 } from '../icons/plus';
import { PLUS_CIRCLE_SOLID_24x24 } from '../icons/plus-circle';
import { ROCKET_LAUNCH_SOLID_24x24 } from '../icons/rocket-launch';
import { TRASH_24x24 } from '../icons/trash';
import { X_MARK_SOLID_24x24 } from '../icons/x-mark';

export const BIRTHDAY_ICONS = {
  ['plus-circle']: PLUS_CIRCLE_SOLID_24x24,
  ['plus']: PLUS_SOLID_24x24,
  ['rocket-launch']: ROCKET_LAUNCH_SOLID_24x24,
  ['bell-alert']: BELL_ALERT_SOLID_24x24 ,
  ['cake']: CAKE_24x24,
  ['chevron-up']: CHEVRON_UP_SOLID_24x24,
  ['chevron-down']: CHEVRON_DOWN_SOLID_24x24,
  ['chevron-left']: CHEVRON_LEFT_SOLID_24x24,
  ['chevron-right']: CHEVRON_RIGHT_SOLID_24x24,
  ['pencil-square']: PENCIL_SQUARE_SOLID_24x24,
  ['phone-arrow-up']: PHONE_ARROW_UP_RIGHT_SOLID_24x24,
  ['trash']: TRASH_24x24,
  ['x-mark']: X_MARK_SOLID_24x24
} as const;

export type IconName = keyof typeof BIRTHDAY_ICONS;