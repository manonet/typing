const fs = require('fs')
const path = require('path')
const { parseString } = require('xml2js')

const keyboardFolder = '../../static/keyboards_xml'
const outputFolder = '../../static/keyboards'

const allLevels = []
// transform XML to the desired JSON shape
const process = (result) => {
  const { keyboard } = result
  const { keyMap } = keyboard
  const { transforms } = keyboard
  const { settings } = keyboard
  const name = keyboard.names[0].name[0].$.value

  console.info(name)

  const langCode = keyboard.$.locale.substring(0, 2)

  const allChars = []
  const levels = []
  const keys = {}
  const charMap = {}

  let d13Empty = true
  let c12Empty = true
  let c13Empty = true

  keyMap.map((mapNode) => {
    const level = mapNode.$ && mapNode.$.modifiers ? mapNode.$.modifiers : 'to'

    /*
    "levels": [
      "to",
      "shift",
      "caps",
      "caps+shift",
      "altR+caps? ctrl+alt+caps?",
      "ctrl+caps?"
   ],
   */
    levels.push(level)

    // collect info about possible levels
    if (!allLevels.includes(level)) {
      allLevels.push(level)
    }

    mapNode.map.map((key) => {
      const { $ } = key
      const {
        iso,
        to: char,
      } = $

      // unescape unicode e.g. \u{22}
      const to = char.replace(/\\u\{([A-Z0-9]+)\}/g, '&#x$1;')

      // ger Enter shape
      switch (iso) {
      case 'D13': d13Empty = false
        break
      case 'C12': c12Empty = false
        break
      case 'C13': c13Empty = false
        break
      default: break
      }

      if (keys[iso]) {
      /*
        if key already exist, add new levels to it, example:
        "E00": {
          "to": "0",
          "shift": "§",
          "caps": "0",
          "caps+shift": "§"
        },
      */
        keys[iso][level] = to
      } else {
        // create the key entry like "E00": { "to": "0" }
        keys[iso] = { [level]: to }
      }

      if (!allChars.includes(to)) {
        allChars.push(to)
      }

      if (!charMap[to]) {
        // only put not existing keys
        charMap[to] = [iso, level]
      }
    })
  })

  // determinate shape of enter key
  // TODO
  let enterVariant = 4
  let enterIso = 'C13'
  if (!d13Empty) {
    // enter.iso = 'C14'
    enterVariant = 2
  } else if (!c12Empty) {
    enterVariant = 1
    enterIso = 'C12'
  } else if (!c13Empty) {
    // enter.iso = 'D14'
    // TODO NOT FOUND
    enterVariant = 3
  }

  allChars.sort((a, b) => a.localeCompare(b, langCode, { sensitivity: 'variant' }))

  const output = {
    name,
    keys,
    levels,
    charMap,
    allChars,
    enterVariant,
    enterIso,
  }

  if (settings) {
    output.settings = settings[0].$
  }

  if (transforms && transforms[0] && transforms[0].transform) {
    output.deadKeys = {}
    transforms[0].transform.map((transform) => {
      output.deadKeys[transform.$.to] = transform.$.from.split('')
      output.allChars.push(transform.$.to)
    })
  }

  return output
}

const convert = (files, dirIn, dirOut) => {
  files.map((file) => {
    // console.log(file)
    if (file !== '_platform.xml') {
      fs.readFile(`${dirIn}/${file}`, 'utf8', (readFileError, data) => {
        if (readFileError) {
          return console.log(readFileError)
        }
        parseString(data, (parseStringError, result) => {
          if (parseStringError) {
            // console.log(parseStringError)
            return
          }
          const output = process(result)
          const { name } = path.parse(file)
          fs.writeFile(`${dirOut}/${name}.json`, JSON.stringify(output, null, 2), (error) => {
            if (error) throw error
          })
          fs.writeFile(`${outputFolder}/allLevels.json`, JSON.stringify(allLevels, null, 2), (error) => {
            if (error) throw error
          })
        })
      })
    }
  })
}

fs.readdirAsync = (dirIn, dirOut) => (
  new Promise(((resolve, reject) => {
    fs.readdir(dirIn, (err, filenames) => {
      if (err) {
        reject(err)
      } else {
        convert(filenames, dirIn, dirOut)
        resolve(filenames)
      }
    })
  }))
)

fs.readdirAsync(`${keyboardFolder}/android`, `${outputFolder}/android`)
fs.readdirAsync(`${keyboardFolder}/chromeos`, `${outputFolder}/chromeos`)
fs.readdirAsync(`${keyboardFolder}/osx`, `${outputFolder}/osx`)
fs.readdirAsync(`${keyboardFolder}/und`, `${outputFolder}/und`)
fs.readdirAsync(`${keyboardFolder}/windows`, `${outputFolder}/windows`)
