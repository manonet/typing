// Levels in theory: 'shift', 'ctrl', 'alt', 'caps', 'cmd', 'opt' along with the 'L' and 'R' optional single suffixes for the first 3

// order of the components (may) counts!
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
