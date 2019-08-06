// Levels in theory: 'shift', 'ctrl', 'alt', 'caps', 'cmd', 'opt' along with the 'L' and 'R' optional single suffixes for the first 3

const arrayContainsAnotherArray = (needle, haystack) => {
  for (let i = 0; i < needle.length; i++) {
    if (haystack.indexOf(needle[i]) === -1) {
      return false;
    }
  }
  return true;
};

const getLevelFromKeys = function(keysArray, levels, CapsLockDown) {
  // keysArray: [ 'ShiftRight' ]
  // levels:  complex array, see keyboard.json files

  if (CapsLockDown) {
    keysArray.push('CapsLock');
  }

  let displayedLevel = 'to';
  levels.map((level) => {
    const levelName = Object.keys(level);
    level[levelName].map((levelArrays) => {
      levelArrays.map((levelArray) => {
        if (arrayContainsAnotherArray(levelArray, keysArray)) {
          displayedLevel = levelName[0];
        }
      });
    });
  });

  return displayedLevel;
};

export default getLevelFromKeys;
