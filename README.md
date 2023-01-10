<!--
 * @Descripttion: your project
 * @version: 1.0
 * @Author: taohq
 * @Date: 2023-1-6 17:08:00
 * @LastEditors: 2023-1-10 9:38:00
-->
# 基于 yeoman-generator 封装的脚手架初始化工具，
用法：
1. 在generators/templates文件夹下 放入把要作为脚手架的文件夹 （必做）
2. 在lib文件下建一个与脚手架文件同名的文件夹 并复制test/index.js文件 或者执行`npm run create`命令行 输入名称创建 （必做）
3. 在上一步生产的文件夹下调整copyTplList变量，此为要传参的文件名称，参考 generators/templates/test/package.json中的`"name": "<%= name %>",` （必做）
4. 在lib/index.js调整你要设置的参数 设置位置自己找 怎么设置参考inquirer.js（随便）
5. 设置package.json的bin 作为执行脚手架的命令行 （随便，默认test-cli）
6. 执行npm link 后，在其他目录下测试 执行命令行 (测试环节，自己看着办) 失败了用npm unlink卸载
7. npm publish 发布 (随便)


`npm run for`根据templates下的文件夹名称 循环创建lib下没有的执行文件
