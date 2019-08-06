import getOS from './getOS';

const getKeyboardOS = function() {
  const OS = getOS();

  switch (OS) {
  case 'Mac':
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
