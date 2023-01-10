#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const source = require('./source');
const content = require('./content');
(async () => {
  try {
    const list1 = await source.readdir(__dirname)
    const list2 = await source.readdir(source.generatorDir)
    const libList = list1.filter(i => {
      return fs.statSync(__dirname + '/' + i).isDirectory()
    })
    const templatesList = list2.filter(i => {
      return fs.statSync(source.generatorDir + '/' + i).isDirectory()
    })
    const res = templatesList.filter(i => !libList.includes(i))
    for (let i of res) {
      await source.mkdir(path.join(__dirname, `/${i}`))
      await source.write(path.join(__dirname, `/${i}/index.js`), content)
    }
  } catch (e) {
    console.log(e)
  }

})()