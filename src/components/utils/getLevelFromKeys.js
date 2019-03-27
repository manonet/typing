const getLevelFromKeys = function (keysArray, CapsLockDown) {
  let displayedLevel = 'to'
  if (CapsLockDown) {
    displayedLevel = 'caps'
  }
  if (keysArray.includes('Shift')) {
    displayedLevel = 'shift'
    if (CapsLockDown) {
      displayedLevel = 'caps+shift'
    }
  } else if (keysArray.includes('AltGraph') || (keysArray.includes('Control') && keysArray.includes('Alt'))) {
    displayedLevel = 'altR+caps? ctrl+alt+caps?'
  }
  return displayedLevel
}

export default getLevelFromKeys
