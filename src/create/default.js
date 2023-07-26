#!/usr/bin/env zx

require('zx/globals');
const { copyDir } = require('../utils/common');
const path = require('path');
const { PACKAGE_CONTENT } = require('../constants/defaultInit');

module.exports = async (answers) => {
  try {
    // 创建新的目录
    await $`mkdir ${answers.PROJECT_NAME}`;
    const baseDir = `${process.cwd()}/${answers.PROJECT_NAME}`;

    const packageFileContent = JSON.stringify(
      {
        name: answers.PROJECT_NAME,
        author: answers.PROJECT_AUTHOR,
        description: answers.PROJECT_DESCRIPTION,
        ...JSON.parse(PACKAGE_CONTENT.content),
      },
      null,
      '\t'
    );
    // 初始化
    fs.writeFile(
      `${baseDir}/package.json`,
      packageFileContent,
      {
        encoding: 'utf-8',
      },
      (err) => {
        err && errorHandler({ type: 'Create index.js failed: ', err });
      }
    );

    copyDir(path.resolve(__dirname, '..') + '/default-dir', baseDir, (a) => {
      console.log(a, '11111111111');
    });

    copyDir(path.resolve(__dirname, '..') + '/custom-config', baseDir, (a) => {
      console.log(a, '11111111111');
    });

    // 跳转至目录
    cd(answers.PROJECT_NAME);
    await $`git init`;

    // 执行安装命令
    await $`yarn`;
  } catch (error) {
    console.log(
      chalk.red(`Create objet defeat! The error message is: ${error}`)
    );
  }
};
