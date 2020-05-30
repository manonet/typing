import Bowser from 'bowser';

export type OS = {
  name: 'MacOS' | 'iOS' | 'Android' | 'Windows' | 'Linux' | 'UNIX' | 'Unknown';
  os: 'osx' | 'android' | 'windows' | 'unknown';
  sign: '&#xf17a;' | '⌘' | '&#xf17c;' | '&#xf179;' | '&#xf17b;' | 'OS';
};

const getOperationSystem = function (): OS {
  const browser =
    typeof window !== 'undefined' && Bowser.parse(window.navigator?.userAgent);
  if (browser && browser.os && browser.os.name) {
    switch (browser.os.name) {
      case 'MacOS':
        return {
          name: 'MacOS',
          os: 'osx',
          sign: '⌘',
        };
      case 'iOS':
        return {
          name: 'iOS',
          os: 'osx',
          sign: '&#xf179;',
        };
      case 'Android':
        return {
          name: 'Android',
          os: 'android',
          sign: '&#xf17b;',
        };
      case 'Windows':
        return {
          name: 'Windows',
          os: 'windows',
          sign: '&#xf17a;',
        };
      case 'Linux':
        return {
          name: 'Linux',
          os: 'osx',
          sign: '&#xf17c;',
        };
      case 'UNIX':
        return {
          name: 'UNIX',
          os: 'osx',
          sign: '⌘',
        };
      default:
        return {
          name: 'Unknown',
          os: 'unknown',
          sign: '&#xf17a;',
        };
    }
  }
  return {
    name: 'Unknown',
    os: 'unknown',
    sign: 'OS',
  };
};

export default getOperationSystem;
