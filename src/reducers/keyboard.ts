import { Keyboard } from '../types';
import { getOperationSystem, DEFAULT_SPEACER } from '../utils';

const os = getOperationSystem();
const osLabel = os.sign;

const keyboard: Keyboard = {
  name: 'Layout1',
  keys: [
    {
      iso: 'A99',
      hand: 'left',
      finger: 'thumb',
      code: 'ControlLeft',
      color: '#fff',
      label: 'Ctrl',
    },
    {
      iso: 'A00',
      hand: 'left',
      finger: 'thumb',
      code: 'WakeUp',
      color: '#fff',
      label: 'Fn',
      optional: true,
    },
    {
      iso: os.name === 'MacOS' ? 'A02' : 'A01',
      hand: 'left',
      finger: 'thumb',
      code: 'OSLeft',
      color: '#fff',
      label: osLabel,
    },
    {
      iso: os.name === 'MacOS' ? 'A01' : 'A02',
      hand: 'left',
      finger: 'thumb',
      code: 'AltLeft',
      color: '#fff',
      label: 'Alt',
    },
    {
      iso: 'A03',
      hand: 'left',
      finger: 'thumb',
      code: 'Lang2',
      color: '#fff',
      label: '한자', // hanja
      optional: true,
    },
    {
      iso: 'A03',
      hand: 'left',
      finger: 'thumb',
      code: 'NonConvert',
      color: '#fff',
      label: '無変換', // muhenkan
      optional: true,
    },
    {
      iso: 'A04',
      hand: 'left',
      finger: 'thumb',
      code: 'Space',
      color: '#fff',
      label: ' ',
      keyTops: [
        {
          level: 'to',
          label: ' ',
        },
      ],
    },
    {
      iso: 'A06',
      hand: 'left',
      finger: 'thumb',
      code: 'Convert',
      color: '#fff',
      label: '変換', // henkan
      optional: true,
    },
    {
      iso: 'A07',
      hand: 'left',
      finger: 'thumb',
      code: 'Lang1',
      color: '#fff',
      label: '한/영', // han/yeong
      optional: true,
    },
    {
      iso: 'A07',
      hand: 'left',
      finger: 'thumb',
      code: 'KanaMode',
      color: '#fff',
      label:
        '<tspan x="880" dy="-1.5em">カタカナ</tspan><tspan x="880" dy="1.2em">ひらがな</tspan><tspan x="880" dy="1.2em">ローマ字</tspan>', // katakana/hiragana/romaji
      optional: true,
    },
    {
      iso: os.name === 'MacOS' ? 'A10' : 'A08',
      hand: 'right',
      finger: 'thumb',
      code: 'AltRight',
      color: '#fff',
      label: 'Alt Gr',
    },
    {
      iso: 'A09',
      hand: 'left',
      finger: 'thumb',
      code: '',
      color: '#fff',
      optional: true,
    },
    {
      iso: os.name === 'MacOS' ? 'A08' : 'A10',
      hand: 'left',
      finger: 'thumb',
      code: 'OSRight',
      color: '#fff',
      label: osLabel,
      optional: true,
    },
    {
      iso: 'A11',
      hand: 'left',
      finger: 'thumb',
      code: 'ContextMenu',
      color: '#fff',
      label: 'Menu',
      optional: true,
    },
    {
      iso: 'A12',
      hand: 'left',
      finger: 'thumb',
      code: 'ControlRight',
      color: '#fff',
      label: 'Ctrl',
    },
    {
      iso: 'B99',
      hand: 'left',
      finger: 'little',
      code: 'ShiftLeft',
      color: '#fff',
      label: '⇧',
    },
    {
      iso: 'B00',
      hand: 'left',
      finger: 'little',
      code: 'IntlBackslash',
      color: '#fff',
      optional: true,
    },
    {
      iso: 'B01',
      hand: 'left',
      finger: 'little',
      code: 'KeyZ',
      color: '#fff',
    },
    {
      iso: 'B02',
      hand: 'left',
      finger: 'ring',
      code: 'KeyX',
      color: '#fff',
    },
    {
      iso: 'B03',
      hand: 'left',
      finger: 'middle',
      code: 'KeyC',
      color: '#fff',
    },
    {
      iso: 'B04',
      hand: 'left',
      finger: 'index',
      code: 'KeyV',
      color: '#fff',
    },
    {
      iso: 'B05',
      hand: 'left',
      finger: 'index',
      code: 'KeyB',
      color: '#fff',
    },
    {
      iso: 'B06',
      hand: 'right',
      finger: 'index',
      code: 'KeyN',
      color: '#fff',
    },
    {
      iso: 'B07',
      hand: 'right',
      finger: 'index',
      code: 'KeyM',
      color: '#fff',
    },
    {
      iso: 'B08',
      hand: 'right',
      finger: 'middle',
      code: 'Comma',
      color: '#fff',
    },
    {
      iso: 'B09',
      hand: 'right',
      finger: 'ring',
      code: 'Period',
      color: '#fff',
    },
    {
      iso: 'B10',
      hand: 'right',
      finger: 'little',
      code: 'Slash',
      color: '#fff',
    },
    {
      iso: 'B11',
      hand: 'right',
      finger: 'little',
      code: 'IntlRo',
      color: '#fff',
      optional: true,
    },
    {
      iso: 'B12',
      hand: 'right',
      finger: 'little',
      code: 'ShiftRight',
      color: '#fff',
      label: '⇧',
    },
    {
      iso: 'C00',
      hand: 'left',
      finger: 'little',
      code: 'CapsLock',
      color: '#fff',
      label: 'Caps Lock',
    },
    {
      iso: 'C01',
      hand: 'left',
      finger: 'little',
      code: 'KeyA',
      color: '#fff',
    },
    {
      iso: 'C02',
      hand: 'left',
      finger: 'ring',
      code: 'KeyS',
      color: '#fff',
    },
    {
      iso: 'C03',
      hand: 'left',
      finger: 'middle',
      code: 'KeyD',
      color: '#fff',
    },
    {
      iso: 'C04',
      hand: 'left',
      finger: 'index',
      code: 'KeyF',
      color: '#fff',
    },
    {
      iso: 'C05',
      hand: 'left',
      finger: 'index',
      code: 'KeyG',
      color: '#fff',
    },
    {
      iso: 'C06',
      hand: 'right',
      finger: 'index',
      code: 'KeyH',
      color: '#fff',
    },
    {
      iso: 'C07',
      hand: 'right',
      finger: 'index',
      code: 'KeyJ',
      color: '#fff',
    },
    {
      iso: 'C08',
      hand: 'right',
      finger: 'middle',
      code: 'KeyK',
      color: '#fff',
    },
    {
      iso: 'C09',
      hand: 'right',
      finger: 'ring',
      code: 'KeyL',
      color: '#fff',
    },
    {
      iso: 'C10',
      hand: 'right',
      finger: 'little',
      code: 'Semicolon',
      color: '#fff',
    },
    {
      iso: 'C11',
      hand: 'right',
      finger: 'little',
      code: 'Quote',
      color: '#fff',
    },
    {
      iso: 'C13',
      hand: 'right',
      finger: 'little',
      code: 'Enter',
      color: '#fff',
      label: '↵',
      keyTops: [
        {
          level: 'to',
          label: '\n',
        },
      ],
    },
    {
      iso: 'D00',
      hand: 'left',
      finger: 'little',
      code: 'Tab',
      color: '#fff',
      label: '↹',
    },
    {
      iso: 'D01',
      hand: 'left',
      finger: 'little',
      code: 'KeyQ',
      color: '#fff',
    },
    {
      iso: 'D02',
      hand: 'left',
      finger: 'ring',
      code: 'KeyW',
      color: '#fff',
    },
    {
      iso: 'D03',
      hand: 'left',
      finger: 'middle',
      code: 'KeyE',
      color: '#fff',
    },
    {
      iso: 'D04',
      hand: 'left',
      finger: 'index',
      code: 'KeyR',
      color: '#fff',
    },
    {
      iso: 'D05',
      hand: 'left',
      finger: 'index',
      code: 'KeyT',
      color: '#fff',
    },
    {
      iso: 'D06',
      hand: 'right',
      finger: 'index',
      code: 'KeyY',
      color: '#fff',
    },
    {
      iso: 'D07',
      hand: 'right',
      finger: 'index',
      code: 'KeyU',
      color: '#fff',
    },
    {
      iso: 'D08',
      hand: 'right',
      finger: 'middle',
      code: 'KeyI',
      color: '#fff',
    },
    {
      iso: 'D09',
      hand: 'right',
      finger: 'ring',
      code: 'KeyO',
      color: '#fff',
    },
    {
      iso: 'D10',
      hand: 'right',
      finger: 'little',
      code: 'KeyP',
      color: '#fff',
    },
    {
      iso: 'D11',
      hand: 'right',
      finger: 'little',
      code: 'BracketLeft',
      color: '#fff',
    },
    {
      iso: 'D12',
      hand: 'right',
      finger: 'little',
      code: 'BracketRight',
      color: '#fff',
    },
    {
      iso: 'D13',
      hand: 'right',
      finger: 'little',
      code: 'Backslash',
      color: '#fff',
      optional: true,
    },
    {
      iso: 'E00',
      hand: 'left',
      finger: 'little',
      code: 'Backquote',
      color: '#fff',
    },
    {
      iso: 'E01',
      hand: 'left',
      finger: 'little',
      code: 'Digit1',
      color: '#fff',
    },
    {
      iso: 'E02',
      hand: 'left',
      finger: 'little',
      code: 'Digit2',
      color: '#fff',
    },
    {
      iso: 'E03',
      hand: 'left',
      finger: 'ring',
      code: 'Digit3',
      color: '#fff',
    },
    {
      iso: 'E04',
      hand: 'left',
      finger: 'middle',
      code: 'Digit4',
      color: '#fff',
    },
    {
      iso: 'E05',
      hand: 'left',
      finger: 'index',
      code: 'Digit5',
      color: '#fff',
    },
    {
      iso: 'E06',
      hand: 'left',
      finger: 'index',
      code: 'Digit6',
      color: '#fff',
    },
    {
      iso: 'E07',
      hand: 'right',
      finger: 'index',
      code: 'Digit7',
      color: '#fff',
    },
    {
      iso: 'E08',
      hand: 'right',
      finger: 'index',
      code: 'Digit8',
      color: '#fff',
    },
    {
      iso: 'E09',
      hand: 'right',
      finger: 'middle',
      code: 'Digit9',
      color: '#fff',
    },
    {
      iso: 'E10',
      hand: 'right',
      finger: 'ring',
      code: 'Digit0',
      color: '#fff',
    },
    {
      iso: 'E11',
      hand: 'right',
      finger: 'little',
      code: 'Minus',
      color: '#fff',
    },
    {
      iso: 'E12',
      hand: 'right',
      finger: 'little',
      code: 'Equal',
      color: '#fff',
    },
    {
      iso: 'E13',
      hand: 'right',
      finger: 'little',
      code: 'IntlYen',
      color: '#fff',
      optional: true,
    },
    {
      iso: 'E14',
      hand: 'right',
      finger: 'little',
      code: 'Backspace',
      color: '#fff',
      label: '⟵',
    },
  ],
  os,
  displayedLevel: 'to',
  keyMap: { ' ': { index: 6, level: 'to' }, '\n': { index: 41, level: 'to' } },
  codeMap: [
    'ControlLeft',
    'WakeUp',
    'OSLeft',
    'AltLeft',
    'Lang2',
    'NonConvert',
    'Space',
    'Convert',
    'Lang1',
    'KanaMode',
    'AltRight',
    '',
    'OSRight',
    'ContextMenu',
    'ControlRight',
    'ShiftLeft',
    'IntlBackslash',
    'KeyZ',
    'KeyX',
    'KeyC',
    'KeyV',
    'KeyB',
    'KeyN',
    'KeyM',
    'Comma',
    'Period',
    'Slash',
    'IntlRo',
    'ShiftRight',
    'CapsLock',
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyF',
    'KeyG',
    'KeyH',
    'KeyJ',
    'KeyK',
    'KeyL',
    'Semicolon',
    'Quote',
    'Enter',
    'Tab',
    'KeyQ',
    'KeyW',
    'KeyE',
    'KeyR',
    'KeyT',
    'KeyY',
    'KeyU',
    'KeyI',
    'KeyO',
    'KeyP',
    'BracketLeft',
    'BracketRight',
    'Backslash',
    'Backquote',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Digit0',
    'Minus',
    'Equal',
    'IntlYen',
    'Backspace',
  ],
  allChars: [
    {
      glyph: DEFAULT_SPEACER,
      correct: 0,
      miswrite: 0,
      misread: 0,
    },
  ],
  layout: '101/104-ANSI',
  deadKeys: {},
};

export default keyboard;
