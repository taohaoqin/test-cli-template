#!/usr/bin/env node
'use strict'
const installList = ['npm', 'yarn']
const inquirer = require('inquirer')
const chalk = require('chalk');
const yosay = require('yosay');
const source = require('./source');

(async () => {
  console.log(
    yosay(
      `Welcome to  ${chalk.red(
        'test-cli'
      )}!`
    )
  );

  let prompts = [
    {
      type: 'input',
      name: 'name',
      message: '请输入项目名称',
      default: 'test-project'
    },
    {
      type: 'input',
      name: 'description',
      message: '请输入项目描述',
      default: '无'
    },
    {
      type: 'list',
      name: 'install',
      message: '请选择安装依赖的方式',
      default: '',
      choices: [
        ...source.installList.map(i => {
          return { name: i, value: i }
        }),
        {
          name: '暂不安装',
          value: ''
        }
      ],
    }
    // 可以在此自定义其他参数
  ];

  const list = await source.readdir(source.generatorDir)
  if (list.length === 0) {
    throw new Error(`缺少脚手架模板文件`)
    return
  }
  if (list.length > 1) {
    //当模板数量大于1的时候 加个选择模板的操作
    prompts.unshift(
      {
        type: 'list',
        name: 'type',
        message: '类型',
        choices: list,
      }
    )
  }

  const option = await inquirer.prompt(prompts)
  try {
    let generator = null
    if (!option.type) {
      option.type = list[0]
    }
    // 加载执行文件 执行文件放置在lib文件夹下 与templates下的文件同名的
    const GeneratorProject = require(`./${option.type}`)
    generator = new GeneratorProject(option)
    if (generator) {
      generator.run()
    }
  } catch (e) {
    console.error(chalk.red(e))
  }

})()
