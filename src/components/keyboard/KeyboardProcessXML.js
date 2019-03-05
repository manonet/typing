
import vars from '../../variables'

const { parseString } = require('xml2js')

export default function KeyboardProcessXML(xml) {
  let keyboardName; let keyboardKeys; let keyLevels; let allKeyboardChars; let deadKeys; let
    functionKeys

  parseString(xml, (err, result) => {
    keyboardName = result.keyboard.names[0].name[0].$.value
    keyboardKeys = []
    keyLevels = [] // ["to", "Shift", "altGr", ...]
    const { keyMap } = result.keyboard
    const { transforms } = result.keyboard
    deadKeys = []
    allKeyboardChars = [] // will contains all characters that is possible to write with actual keyboard layout

    let d13Empty = true
    let c12Empty = true
    let c13Empty = true

    // https://en.wikipedia.org/wiki/ISO/IEC_9995
    functionKeys = {
      backspace: {
        labels: {
          to: '⟵',
        },
        iso: 'E14',
        state: 'def',
      },

      tab: {
        labels: {
          to: '↹',
        },
        iso: 'D00',
        state: 'def',
      },

      enter: {
        name: 'enter',
        labels: {
          to: '↵',
        },
        iso: 'D13',
        state: 'def',
      },

      capsLock: {
        labels: {
          to: 'Caps Lock',
        },
        iso: 'C00',
        state: 'def',
      },

      leftShift: {
        labels: {
          to: '⇧',
        },
        iso: 'B99',
        state: 'def',
      },

      rightShift: {
        labels: {
          to: '⇧',
        },
        iso: 'B13',
        state: 'def',
      },

      leftCtrl: {
        labels: {
          to: 'Ctrl',
        },
        iso: 'A99',
        state: 'def',
      },

      fn: {
        labels: {
          to: 'Fn',
        },
        iso: 'A00',
        state: 'def',
      },

      leftCommand: {
        labels: {
          to: '⌘',
        },
        iso: 'A01',
        state: 'def',
      },

      alt: {
        labels: {
          to: 'Alt',
        },
        iso: 'A02',
        state: 'def',
      },

      altGr: {
        labels: {
          to: 'Alt Gr',
        },
        iso: 'A08',
        state: 'def',
      },

      rightCommand: {
        labels: {
          to: '⌘',
        },
        iso: 'A09',
        state: 'def',
      },

      menu: {
        labels: {
          to: 'Menu',
        },
        iso: 'A11',
        state: 'def',
      },

      rightCtrl: {
        labels: {
          to: 'Ctrl',
        },
        iso: 'A12',
        state: 'def',
      },
    }

    if (transforms) {
      // creating an array of objects from transformNode
      const transformNode = transforms[0].transform
      for (let i = 0; i < transformNode.length; i++) {
        // transformNode[i] is e.g. <transform from="´a" to="á"/>
        const myObj = {}
        myObj.from = transformNode[i].$.from // e.g. "´a"
        myObj.to = transformNode[i].$.to // e.g. "á"
        deadKeys.push(myObj)

        // extend the allKeyboardChars array with the characters that only can write with key combinations:
        allKeyboardChars.push(myObj.to)
      }
    }

    for (let i = 0; i < keyMap.length; i++) {
      let modifier = 'to'
      // we assume that the first item ([0]) is always without transform - TypeError: Cannot read property 'modifiers' of undefined issue
      if (i !== 0) {
        modifier = keyMap[i].$.modifiers
        /*
        if (keyMap[i].$.modifiers === "shift") {
          modifier = "shift";
        } else if (keyMap[i].$.modifiers === "caps") {
          modifier = "caps";
        } else if (keyMap[i].$.modifiers === "caps+shift") {
          modifier = "cs";
        } else if (keyMap[i].$.modifiers === "cs") {
          modifier = "caps";
        } else if (keyMap[i].$.modifiers.lastIndexOf("altR+caps") !== -1) {
          modifier = "altGr";
        } else if (keyMap[i].$.modifiers === "ctrl+caps?") {
          modifier = "cc";
        } else {
          // prevent double ISO key in map
          modifier = "";
        }
        */
      }

      keyLevels.push(modifier)

      const mapNode = keyMap[i].map
      for (const map of mapNode) {
        // loop trough each keyMap, e.g. <map iso="E00" to="0"/>
        let { to } = map.$
        const { iso } = map.$

        // unescape unicode e.g. \u{22}
        if (to.indexOf('\\u{') > -1) {
          to = to.replace('\\u{', '&#x')
          to = to.replace('}', ';')
        }

        // extend the allKeyboardChars array with the characters:
        allKeyboardChars.push(to)

        let transformChars = ''
        for (let i = 0; i < deadKeys.length; i++) {
          // check only the first character e.g from="´a"
          const transform = deadKeys[i].from.substring(0, 1)
          const char = to // e.g. to="á"

          if (transform.indexOf(char) !== -1) {
            // if the actual character of the key match with the first character of the transform combination, put it to transformChars
            transformChars += deadKeys[i].to
          }
          // TODO - pop the item from the array, or make somehow faster
        }

        if (iso === 'D13') {
          d13Empty = false
        } else if (iso === 'C12') {
          c12Empty = false
        } else if (iso === 'C13') {
          c13Empty = false
        }

        if (modifier === 'to') {
          // create the necessary attributes once, at the first time
          const myObj = {}
          myObj.labels = {}
          myObj.labels[modifier] = to
          myObj.iso = iso
          myObj.state = 'def'

          const rowLetter = iso.substring(0, 1)
          let row = 0
          const column = parseInt(iso.substring(1, 3))
          let translateX = vars.keyWidth * column
          let translateY = 0

          switch (rowLetter) {
          case 'D':
            row = 1
            translateX = vars.dRowShift + vars.keyWidth * column
            translateY = vars.keyHeight
            break
          case 'C':
            translateX = vars.cRowShift + vars.keyWidth * column
            translateY = vars.keyHeight * 2
            break
          case 'B':
            translateX = vars.bRowShift + vars.keyWidth * column
            translateY = vars.keyHeight * 3
            break
          case 'A':
            translateX = vars.aRowShift + vars.keyWidth * column
            translateY = vars.keyHeight * 4
            break
          default:
            break
          }

          myObj.translate = `translate(${translateX}, ${translateY})`
          myObj.x = translateX
          myObj.y = translateY

          if (transformChars.length && transformChars !== ' ') {
            // add transform only if not empty or not a space
            myObj.transform = transformChars
          }

          keyboardKeys.push(myObj)
        } else {
          const result = keyboardKeys.filter(obj => obj.iso == iso)
          result[0].labels[modifier] = to

          if (transformChars.length && transformChars !== ' ') {
            result[0].transform = transformChars
          }
        }
      }
    }

    // determinate shape of enter key
    // TODO
    functionKeys.enter.variant = 1
    if (!d13Empty) {
      functionKeys.enter.iso = 'C14'
      functionKeys.enter.variant = 2
    } else if (!c13Empty) {
      functionKeys.enter.iso = 'D14'
      functionKeys.enter.variant = 3
    }
  })

  // Unique values in an array
  allKeyboardChars = [...new Set(allKeyboardChars)]

  // sort TODO - lang
  allKeyboardChars.sort((a, b) => a.localeCompare(b, 'hu', { sensitivity: 'variant' }))

  return {
    keyboard: {
      name: keyboardName,
      keys: keyboardKeys,
      levels: keyLevels,
      allChars: allKeyboardChars,
      deadKeys,
      functionKeys,
    },
  }
}
