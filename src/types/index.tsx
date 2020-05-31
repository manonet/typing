import { OS } from '../utils';

import { allEventKeyCodes } from './allEventKeyCodes';
import { allISO } from './allISO';
import { allLevels } from './allLevels';

export { allISO, allLevels };

export type Glyph = string;

export type ISO = typeof allISO[number];

export type EventCode = typeof allEventKeyCodes[number];

export type Level = typeof allLevels[number];

export type Levels = Level[];

export type LevelMap = {
  [key in Level]?: Glyph;
};

export type HandsAndFingers = {
  hand: 'left' | 'right';
  finger: 'thumb' | 'index' | 'middle' | 'ring' | 'little';
};

export type PossibleKeyStates = {
  marker?: 'toPressFirst' | 'toPressSecond' | 'uncovered';
  pressure?: 'pressed' | 'locked'; // locked is for CapsLock 'on' state
  succeedState?: 'missed' | 'correct' | 'error';
};

export type Key = {
  iso: ISO;
  code: EventCode;
  dead?: boolean;
  label?: string;
  optional?: boolean;
} & HandsAndFingers &
  PossibleKeyStates &
  LevelMap;

export type DeadKeys = {
  [key in Glyph]: [Glyph, Glyph];
};

export type Layout =
  | '101/104-ANSI'
  | '101/104-Variant'
  | '102/105-ISO'
  | '103/106-KS'
  | '104/107-ABNT'
  | '106/109-JIS';

export type Keyboard = {
  allChars: [];
  deadKeys?: DeadKeys;
  displayedLevel: Level;
  keys: Key[];
  layout: Layout;
  name: string;
  os: OS;
};

export type StatisticProps = {
  correct: [];
  miswrite: [];
  misspell: [];
};
