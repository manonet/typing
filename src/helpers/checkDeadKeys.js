const fs = require('fs');
const path = require('path');

const keyboardFolder = '../../static/keyboards';
const outputFolder = '../../static/keyboards';

const deadKeysSummary = {};
const repeat = {};
const boardsWithDeadKeys = [];
const boardsWithoutDeadKeys = [];

const process = (data) => {
  const { deadKeys, name } = data;
  if (deadKeys) {
    boardsWithDeadKeys.push(name);
    Object.keys(deadKeys).map((key) => {
      if (
        deadKeysSummary[key] &&
        deadKeysSummary[key].length === deadKeys[key].length &&
        deadKeysSummary[key].sort().every(function (value, index) {
          return value === deadKeys[key].sort()[index];
        })
      ) {
        if (repeat[key]) {
          repeat[key] += 1;
        } else {
          repeat[key] = 1;
        }
      } else {
        deadKeysSummary[key] = deadKeys[key];
      }
    });
  } else {
    boardsWithoutDeadKeys.push(name);
  }

  return {
    boardsWithDeadKeys,
    boardsWithoutDeadKeys,
    deadKeysSummary,
    repeat,
  };
};

const makeStatistic = () => {
  return {
    boardsWithDeadKeys,
    boardsWithoutDeadKeys,
    deadKeysSummary,
    repeat,
  };
};

const convert = (files, dirIn) => {
  files.map((file) => {
    // console.log(file)
    if (file !== '_platform.xml') {
      fs.readFile(`${dirIn}/${file}`, 'utf8', (readFileError, data) => {
        if (readFileError) {
          return console.error(readFileError);
        }

        process(JSON.parse(data));
        const { name } = path.parse(file);

        fs.writeFile(
          `${outputFolder}/allDeadKeys.json`,
          JSON.stringify(makeStatistic(), null, 2),
          (error) => {
            if (error) throw error;
          }
        );
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
        convert(filenames, dirIn);
        resolve(filenames);
      }
    });
  });

fs.readdirAsync(`${keyboardFolder}/osx`);
fs.readdirAsync(`${keyboardFolder}/windows`);
