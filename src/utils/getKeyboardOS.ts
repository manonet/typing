import Bowser from 'bowser';

const getKeyboardOS = function() {
  const browser = Bowser.parse(window.navigator.userAgent);

  switch (browser.os.name) {
    case 'MacOS':
      return 'osx';
    case 'iOS':
      return 'osx';
    case 'Android':
      return 'android';
    case 'Windows':
      return 'windows';
    case 'Linux':
      return 'osx';
    case 'UNIX':
      return 'osx';
    default:
      return 'und';
  }
};

export default getKeyboardOS;
