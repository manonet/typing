import getKeyLocationFromIso from './getKeyLocationFromIso'

const findCharOnKeyboard = function (props) {
  const {
    keyboard,
    characterToFind,
  } = props

  const {
    keys,
    levels,
  } = keyboard

  let keyToPressFound = false
  let iso
  let level
  let levelObject
  let location

  if (keys && levels && characterToFind) {
    // loop trough on each level first, then on the keys. It is necessary, because the same character can be appear multiple times on the same keyboard, e.g. "í" on hungarian, once "normal" in "to" level, once on the "j" key in "AltGr" level. Key "j" will found first otherwise.
    Object.keys(levels).map((l) => {
      // levels[level] = altR+caps? ctrl+alt+caps?
      if (!keyToPressFound) {
        level = Object.keys(levels[l])[0]
        levelObject = levels[l]
        Object.keys(keys).map((key) => {
          if (keys[key][level] === characterToFind) {
            // found!
            iso = key
            location = getKeyLocationFromIso(key)
            if (!keyToPressFound) {
              keyToPressFound = true
            }
          }
          return null
        })
      }
      return null
    })
  }

  // Hardcode values for Enter key on lewline character
  // Enter is not part of keyboard object but the functionkexs
  if (characterToFind === '\n') {
    keyToPressFound = true
    iso = 'Enter'
    level = 'to'
    location = { side: "Left" }
  }

  if (keyToPressFound) {
    return {
      iso,
      level: levelObject,
      char: characterToFind,
      ...location,
    }
  }
  return null
}

export default findCharOnKeyboard
