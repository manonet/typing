// TODO - every language needs unique order
// TODO - order should be customizable by the user
// TODO - if the user can reorder the list, how to determin, which item was already learned, and which not?
// TODO - start with introduction for 'Space', 'Enter', 'Backspace', etc. keys
import { EventCode } from '../types';

export const keyOrder = [
  'KeyJ',
  'KeyF',
  'KeyK',
  'KeyD',
  'KeyL',
  'KeyS',
  'Semicolon',
  'KeyA',
  'KeyU',
  'KeyT',
  'KeyI',
  'KeyR',
  'KeyO',
  'KeyE',
  'KeyM',
  'KeyC',
] as EventCode[];

export const homeRowKeys = [
  'KeyJ',
  'KeyF',
  'KeyK',
  'KeyD',
  'KeyL',
  'KeyS',
  'Semicolon',
  'KeyA',
];

export const complianceRatio = 0.5; // 0.98;

export type KeyRequirements = {
  [key in EventCode]: {
    hits: number;
  };
};

export const keyRequirements: KeyRequirements = {
  KeyJ: {
    hits: 3,
  },
  KeyF: {
    hits: 3,
  },
  KeyK: {
    hits: 3,
  },
  KeyD: {
    hits: 3,
  },
  KeyL: {
    hits: 3,
  },
};
