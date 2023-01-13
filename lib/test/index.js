'use strict';
const Generator = require('yeoman-generator');
const yeoman = require('yeoman-environment');
const path = require('path');
const source = require('../source');
const chalk = require('chalk');

const copyTplList = ['package.json'] // 要传参的模板文件

module.exports = class extends Generator {
  constructor (props) {
    super([], {
      env: yeoman.createEnv([], {
        cwd: path.join(source.CWD, props.name),
      }),
      resolved: source.generatorDir,
    });

    this.props = props;
  }

  default () {
    try {
      this.destinationRoot(this.destinationPath());
    } catch (e) {
      this.log(chalk.red(e))
    }
  }

  async Writing () {
    try {
      this.log(chalk.yellow('\nWriting...\n'))
      const filePath = path.join(source.generatorDir, this.props.type)
      const self = this
      function copyTpl (from, to, data) {
        self.fs.copyTpl(path.join(filePath, from), self.destinationPath(to || from), data)
      }
      function copy (from, to) {
        self.fs.copy(path.join(filePath, from), self.destinationPath(to || from))
      }
      const filesList = await source.readdir(filePath)
      filesList.forEach(i => {
        if (copyTplList.includes(i)) {
          copyTpl(i, i, this.props)
        } else {
          copy(i)
        }
      })
    } catch (error) {
      this.log(chalk.red(error))
    }
  }

  Install () {
    try {
      if (this.props.install) {
        let option = { bower: false }
        source.installList.forEach(i => {
          option[i] = false
        })
        option[this.props.install] = true
        this.log(chalk.yellow('\n安装依赖...\n'))
        this.installDependencies(option)
      }
    } catch (e) {
      this.log(chalk.red(e))
    }
  }

  end () {
    this.log(chalk.green('\n创建成功\n'))
  }
}
