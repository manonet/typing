export type ISO = string;
export type Character = string;
export type CapsLockDown = boolean;
export type Levels = [];

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
};
export type TKeyboardEventKeyValue = typeof KeyboardEventKey[keyof typeof KeyboardEventKey];
export type KeyboardEventKeys = TKeyboardEventKeyValue[];

export type Keyboard = {
  name: string;
  keys: {};
  levels: {};
  keyLevels: [];
  allChars: [];
  deadKeys: [];
};
