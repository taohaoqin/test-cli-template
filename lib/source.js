const path = require("path");
const fs = require('fs')
module.exports = {
  installList: ['npm', 'yarn'],
  CWD: process.cwd(),
  generatorDir: path.join(__dirname, '../generators/templates'),
  readdir: (path, option = '') => {
    return new Promise((resolve, reject) => {
      fs.readdir(path, option, (err, files) => {
        if (!err) {
          resolve(files)
        } else {
          reject(err)
        }
      })
    })
  },
  mkdir: (path, option = {}) => {
    return new Promise((resolve, reject) => {
      fs.mkdir(path, option, (err, files) => {
        if (!err) {
          resolve(files)
        } else {
          reject(err)
        }
      })
    })
  },
  write: (path, option = '') => {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, option, (err, files) => {
        if (!err) {
          resolve(files)
        } else {
          reject(err)
        }
      })
    })
  }
}