const path = require("path");
const fs = require('fs')
exports.CWD = process.cwd();
exports.generatorDir = path.join(__dirname, '../generators/templates');
exports.readdir = (path, option = {}) => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, {}, (err, files) => {
      if (!err) {
        resolve(files)
      } else {
        reject(err)
      }
    })
  })
}