import {
  allEventKeyCodes,
  navigationKeyCodes,
  functionalKeyCodes,
} from './allEventKeyCodes';
import { allISO } from './allISO';
import { allLevelsOrdered } from './allLevelsOrdered';

export { navigationKeyCodes, functionalKeyCodes };

export { allISO, allLevelsOrdered };

export type OS = {
  name: 'MacOS' | 'iOS' | 'Android' | 'Windows' | 'Linux' | 'UNIX' | 'Unknown';
  os: 'osx' | 'android' | 'windows' | 'unknown';
  sign: '&#xf17a;' | '⌘' | '&#xf17c;' | '&#xf179;' | '&#xf17b;' | 'OS';
};

export type Glyph = string;

export type ISO = typeof allISO[number];

export type EventCode = typeof allEventKeyCodes[number];

export type Level = typeof allLevelsOrdered[number];

export type Levels = Level[];

export type KeyTop = Partial<
  {
    [key in Level]: {
      dead?: boolean;
      label?: Glyph;
      toLearn?: boolean;
      learned?: boolean;
    };
  }
>;

export type HandSide = 'left' | 'right';
export type Fingers = 'thumb' | 'index' | 'middle' | 'ring' | 'little';
export type HandsAndFingers = {
  hand: HandSide;
  finger: Fingers;
};

export type PossibleKeyStates = {
  marker?: 'toPressFirst' | 'toPressSecond' | 'uncovered';
  pressure?: 'pressed' | 'locked'; // locked is for CapsLock 'on' state
  succeedState?: 'missed' | 'correct' | 'error';
};

export type Key = {
  iso: ISO;
  code: EventCode;
  color?: string;
  dead?: boolean;
  label?: string;
  optional?: boolean;
  keyTops?: KeyTop;
} & HandsAndFingers &
  PossibleKeyStates;

export type KeyMap = {
  [key in Glyph]: { index: number; level: Level };
};

export type Marks = {
  [key in string]: PossibleKeyStates;
};

export type KeyDown = {
  code: EventCode;
  dead?: boolean;
  level: Level;
};

export type DeadKeys = {
  [key in Glyph]: [Glyph, Glyph];
};

export type GlyphStatistics = {
  glyph: Glyph;
  correct?: number;
  miswrite?: number;
  misread?: number;
  discoveredAt?: number;
};

export type Layout =
  | '101/104-ANSI'
  | '101/104-Variant'
  | '102/105-ISO'
  | '103/106-KS'
  | '104/107-ABNT'
  | '106/109-JIS';

export type Keyboard = {
  allChars: GlyphStatistics[];
  deadKeys?: DeadKeys;
  displayedLevel: Level;
  keys: Key[];
  keyMap: KeyMap;
  codeMap: EventCode[];
  layout: Layout;
  name: string;
  os: OS;
};
