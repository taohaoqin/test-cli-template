#!/usr/bin/env node
'use strict'
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
        {
          name: 'npm',
          value: 'npm'
        },
        {
          name: 'cnpm',
          value: 'cnpm'
        },
        {
          name: 'yarn',
          value: 'yarn'
        },
        {
          name: 'pnpm',
          value: 'pnpm'
        },
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
    // 加载执行文件
    if (!option.type) {
      option.type = list[0]
    }
    const GeneratorProject = require(`./${option.type}`)
    if (GeneratorProject) {
      generator = new GeneratorProject(option)
    } else {
      // 执行文件放置在lib文件夹下 与templates下同名的
      throw new Error(`缺少${option.type}模板的执行文件`)
    }
    if (generator) {
      generator.run()
    }
  } catch (e) {
    console.error(e)
  }

})()
