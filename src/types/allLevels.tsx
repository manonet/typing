// Levels in theory: 'shift', 'ctrl', 'alt', 'caps', 'cmd', 'opt' along with the 'L' and 'R' optional single suffixes for the first 3
/*
// https://stackoverflow.com/questions/27263148/how-can-i-generate-non-repeated-possible-combinations-of-a-set-of-characters-in
// expectation example:
const myArray = ['a', 'b', 'c', 'd'];
const output = [
  'a',
  'b',
  'c',
  'd',
  'ab',
  'ac',
  'ad',
  'bc',
  'bd',
  'cd',
  'abc',
  'abd',
  'adc',
  'bcd',
  'abcd',
];
// currently it is a manual task
*/

// order of the components counts!
export const allLevels = [
  'to',
  'Alt',
  'AltGraph',
  // 'CapsLock',
  // 'Control',
  'Shift',
  // 'Alt+CapsLock',
  // 'Alt+Control',
  'Alt+Shift',
  // 'AltGraph+CapsLock',
  // 'AltGraph+Control',
  'AltGraph+Shift',
  // 'CapsLock+Control',
  // 'CapsLock+Shift',
  // 'Control+Shift',
  // 'Alt+CapsLock+Control',
  // 'Alt+CapsLock+Shift',
  // 'Alt+Control+Shift',
  // 'AltGraph+CapsLock+Control',
  // 'AltGraph+CapsLock+Shift',
  // 'CapsLock+Control+Shift',
  // 'AltGraph+CapsLock+Control+Shift',
] as const;
