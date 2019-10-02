const fs = require('fs');
const path = require('path');
const { parseString } = require('xml2js');

const keyboardFolder = '../../static/keyboards_xml';
const outputFolder = '../../static/keyboards';

const allISO = [];
// transform XML to the desired JSON shape
const process = (result) => {
  const { keyboard } = result;
  const { keyMap } = keyboard;
  const name = keyboard.names[0].name[0].$.value;

  console.info(name);

  keyMap.map((mapNode) => {
    const level = mapNode.$ && mapNode.$.modifiers ? mapNode.$.modifiers : 'to';

    if (level === 'to') {
      mapNode.map.map((key) => {
        const { $ } = key;
        const { iso } = $;
        // collect info about possible levels
        if (!allISO.includes(iso)) {
          allISO.push(iso);
        }
      });
    }
  });

  const output = {
    name,
  };

  return output;
};

const convert = (files, dirIn, dirOut) => {
  files.map((file) => {
    // console.log(file)
    if (file !== '_platform.xml') {
      fs.readFile(`${dirIn}/${file}`, 'utf8', (readFileError, data) => {
        if (readFileError) {
          return console.log(readFileError);
        }
        parseString(data, (parseStringError, result) => {
          if (parseStringError) {
            // console.log(parseStringError)
            return;
          }
          const output = process(result);
          const { name } = path.parse(file);
          fs.writeFile(
            `${outputFolder}/allISO.json`,
            JSON.stringify(allISO, null, 2),
            (error) => {
              if (error) throw error;
            }
          );
        });
      });
    }
  });
};

fs.readdirAsync = (dirIn, dirOut) =>
  new Promise((resolve, reject) => {
    fs.readdir(dirIn, (err, filenames) => {
      if (err) {
        reject(err);
      } else {
        convert(filenames, dirIn, dirOut);
        resolve(filenames);
      }
    });
  });

// fs.readdirAsync(`${keyboardFolder}/android`, `${outputFolder}/android`)
// fs.readdirAsync(`${keyboardFolder}/chromeos`, `${outputFolder}/chromeos`)
fs.readdirAsync(`${keyboardFolder}/osx`, `${outputFolder}/osx`);
// fs.readdirAsync(`${keyboardFolder}/und`, `${outputFolder}/und`)
fs.readdirAsync(`${keyboardFolder}/windows`, `${outputFolder}/windows`);

/*

[a, b, c, d]
[a, x, c, d]
[1, 2, 3, 4]
[w, e, r, d]
[a, i, o, p]

*/
