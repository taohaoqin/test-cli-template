'use strict';
const Generator = require('yeoman-generator');
const yeoman = require('yeoman-environment');
const path = require('path');
const source = require('../source');

const copyTplList = ['package.json'] // 要传参的文件

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
    this.destinationRoot(this.destinationPath());
  }

  async Writing () {
    this.log('\nWriting...\n')
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
  }

  Install () {
    if (this.props.install) {
      let option = { bower: false, npm: false, cnpm: false, pnpm: false, yarn: false }
      option[this.props.install] = true
      this.log('\n安装依赖...\n')
      this.installDependencies(option)
    }
  }
}
