#!/usr/bin/env node
const inquirer = require('inquirer')
const path = require("path");
const chalk = require('chalk');
const content = require('./content');
const source = require('./source');

(async () => {
  try {
    const list = await source.readdir(__dirname)
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: '请输入文件名称',
        validate: function (val) {
          if (!val) {
            return '文件名称不能为空'
          } else if (list.includes(val)) {
            return '该文件名称已存在'
          } else {
            return true
          }
        }
      },
    ]
    const { name } = await inquirer.prompt(prompts)
    await source.mkdir(path.join(__dirname, `/${name}`))
    await source.write(path.join(__dirname, `/${name}/index.js`), content)
    console.log(chalk.green('创建成功'))
  } catch (e) {
    console.log(chalk.red(e))
  }
})()
