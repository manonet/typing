import { allLevels } from './allLevels';
import { allISO } from './allISO';
import { allEventCodes } from './allEventCodes';
export type Character = string;
export type CapsLockDown = boolean;

export type ISO = typeof allISO[number];
export type EventCode = typeof allEventCodes[number];

export const Modifier = {
  SHIFT: 'shift' as 'shift',
  SHIFTL: 'shiftL' as 'shiftL',
  SHIFTR: 'shiftR' as 'shiftR',
  CTRL: 'ctrl' as 'ctrl',
  CTRLL: 'ctrlL' as 'ctrlL',
  CTRLR: 'ctrlR' as 'ctrlR',
  ALT: 'alt' as 'alt',
  ALTL: 'altL' as 'altL',
  ALTR: 'altR' as 'altR',
  OPT: 'opt' as 'opt',
  OPTL: 'optL' as 'optL',
  OPTR: 'optR' as 'optR',
  CMD: 'cmd' as 'cmd',
};
export type TModifierValue = typeof Modifier[keyof typeof Modifier];
export type Modifiers = TModifierValue[];

export const KeyboardEventKey = {
  SHIFTLEFT: 'ShiftLeft' as 'ShiftLeft',
  SHIFTRIGHT: 'ShiftRight' as 'ShiftRight',
  CONTROLLEFT: 'ControlLeft' as 'ControlLeft',
  CONTROLRIGHT: 'ControlRight' as 'ControlRight',
  ALTLEFT: 'AltLeft' as 'AltLeft',
  ALTRIGHT: 'AltRight' as 'AltRight',
  METALEFT: 'MetaLeft' as 'MetaLeft',
  METARIGHT: 'MetaRight' as 'MetaRight',
  OSLEFT: 'OSLeft' as 'OSLeft',
  OSRIGHT: 'OSRight' as 'OSRight',
};
export type TKeyboardEventKeyValue = typeof KeyboardEventKey[keyof typeof KeyboardEventKey];
export type KeyboardEventKeys = TKeyboardEventKeyValue[];

export type Level = typeof allLevels[number];

export type LevelMap = {
  [key in Level]: Character;
};

export type ISOKeys = {
  [key in ISO]: LevelMap;
};

export type Levels = {
  [key in Level]: Array<Array<KeyboardEventKeys>>;
};

export type CharMap = {
  [key in Character]: [ISO, Level];
};

export type DeadKeys = {
  [key in Character]: [Character, Character];
};

export type Keyboard = {
  name: string;
  keys: ISOKeys;
  levels: Levels;
  charMap: CharMap;
  allChars: string[];
  deadKeys?: DeadKeys;
  enterVariant: 1 | 2 | 3 | 4;
  enterIso: 'C12' | 'C13';
};

export type StatisticProps = {
  correct: [];
  miswrite: [];
  misspell: [];
};
