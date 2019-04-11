const modifierKeyMap = require('./modifierKeyMap')

const { ModifierToKey } = modifierKeyMap

const getKeyArrayFromLevelString = (levelString) => {
  const combinationsArray = []
  // converting default level string into array of keys, e.g:
  // "cmd+caps? cmd+opt+caps?" into:
  // [ [ [ 'MetaLeft', 'MetaRight' ] ], [ [ 'MetaLeft', 'MetaRight' ], [ 'AltLeft', 'AltRight' ] ] ]
  levelString.split(' ').map((combination) => {
    // spaces means `OR`
    const keysArray = []
    combination.split('+').map((modifier) => {
      // plus sign means `in combination with`
      // questionmark means optional key
      // only the perfect matches are taken, so if modifier ends with `?`, it will not processed
      const foundKey = ModifierToKey[modifier]
      if (foundKey) {
        keysArray.push(foundKey)
      }
    })
    if (keysArray.length) {
      // keysArray is mixed, it contains strings like 'ShiftLeft' or arrays like ['ShiftLeft', 'ShiftRight']
      // I call the keys in this arrays `bilateral`, because they exist in both sides
      // sorting takes the strings to the first place, followed by arrays,
      // this helps the processing in the next steps
      keysArray.sort((a, b) => {
        if (typeof a !== 'string' && typeof b === 'string') {
          return 1
        }
        if (typeof a === 'string' && typeof b !== 'string') {
          return -1
        }
        return 0
      })
      combinationsArray.push(keysArray)
    }
  })


  const output = []

  // convert [ [ [ 'MetaLeft', 'MetaRight' ] ], [ [ 'MetaLeft', 'MetaRight' ], [ 'AltLeft', 'AltRight' ] ] ]
  // into [
  //   [ [ 'MetaLeft' ], [ 'MetaRight' ] ],
  //   [ [ 'AltLeft', 'MetaLeft' ],
  //   [ 'AltLeft', 'MetaRight' ],
  //   [ 'AltRight', 'MetaLeft' ],
  //   [ 'AltRight', 'MetaRight' ] ]
  // ]
  // in order to make matching with pressed keys easier
  combinationsArray.map((comboItem) => {
    let singleSidedArray = [[]]
    comboItem.map((item) => {
      if (typeof item === 'string') {
        singleSidedArray[0].push(item)
      } else {
        const tempArray = []
        item.map((bilateralVariant) => {
          singleSidedArray.map((singleKey) => {
            const arrayWithBilateral = [bilateralVariant, ...singleKey]
            tempArray.push(arrayWithBilateral)
          })
        })
        singleSidedArray = tempArray
      }
    })
    output.push(singleSidedArray)
  })

  return output
}

module.exports = getKeyArrayFromLevelString
