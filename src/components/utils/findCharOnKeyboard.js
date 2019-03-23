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
  let location

  if (keys && levels && characterToFind) {
    // loop trough on each level first, then on the keys. It is necessary, because the same character can be appear multiple times on the same keyboard, e.g. "í" on hungarian, once "normal" in "to" level, once on the "j" key in "AltGr" level. Key "j" will found first otherwise.
    Object.keys(levels).map((l) => {
      // levels[level] = altR+caps? ctrl+alt+caps?
      if (!keyToPressFound) {
        level = levels[l]
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
  if (keyToPressFound) {
    return {
      iso,
      level,
      ...location,
    }
  }
  return null
}

export default findCharOnKeyboard
