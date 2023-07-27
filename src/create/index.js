#!/usr/bin/env zx

require('zx/globals');
const inquirer = require('inquirer');
const customCreateHandler = require('./custom');
const { PACKAGE_CONTENT } = require('../constants/defaultInit');
const { copyDir } = require('../utils/common');

const DEFAULT_QUESTIONS = [
  {
    type: 'input',
    name: 'PROJECT_NAME',
    message: 'Project name:',
    validate: function (name) {
      const done = this.async();
      // 如果目录已经存在，提示修改目录名称
      if (['', null, undefined].includes(name)) {
        done('Please enter the project name!', true);
        return;
      }
      if (fs.existsSync(name)) {
        done(
          `The directory "${name}" is exist!!Please reset the dirname.`,
          true
        );
        return;
      }
      done(null, true);
    },
  },
  {
    type: 'input',
    name: 'PROJECT_DESCRIPTION',
    message: 'Project description:',
  },
  {
    type: 'input',
    name: 'PROJECT_AUTHOR',
    message: 'Project author:',
  },
  {
    type: 'list',
    name: 'SELECTED_TEMPLATE',
    message: 'select a template',
    choices: [
      { name: 'vite', value: 'vite', short: 'Faster in the development ' },
      { name: 'gatsby', value: 'gatsbyjs', short: 'For official website' },
      { name: 'next ', value: 'nextjs', short: 'Free rendering options' },
      {
        name: 'custom',
        value: 'custom',
        short: 'Contains only simple configurations',
      },
    ],
  },
];

module.exports.run = async () => {
  try {
    // 获取输入的信息
    const {
      SELECTED_TEMPLATE,
      PROJECT_NAME,
      PROJECT_AUTHOR,
      PROJECT_DESCRIPTION,
    } = await inquirer.prompt(DEFAULT_QUESTIONS);

    switch (SELECTED_TEMPLATE) {
      case 'vite':
        await $`npm create vite@latest ${PROJECT_NAME} -- --template react-ts`;
        customCreateHandler({
          PROJECT_NAME,
          PROJECT_AUTHOR,
          PROJECT_DESCRIPTION,
        });

        break;
      case 'gatsbyjs':
        $`npm init gatsby -- -y -ts ${PROJECT_NAME}`;
        customCreateHandler({
          PROJECT_NAME,
          PROJECT_AUTHOR,
          PROJECT_DESCRIPTION,
        });
        break;

      case 'nextjs':
        $`npx create-next-app@latest ${PROJECT_NAME}`;
        customCreateHandler({
          PROJECT_NAME,
          PROJECT_AUTHOR,
          PROJECT_DESCRIPTION,
        });
        break;
      case 'custom':
        // 创建新的目录
        await $`mkdir ${PROJECT_NAME}`;
        const baseDir = `${process.cwd()}/${PROJECT_NAME}`;

        const packageFileContent = JSON.stringify(
          {
            name: PROJECT_NAME,
            author: PROJECT_AUTHOR,
            description: PROJECT_DESCRIPTION,
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

        copyDir(
          path.resolve(__dirname, '..') + '/constants/default-config',
          baseDir
        );

        copyDir(
          path.resolve(__dirname, '..') + '/constants/custom-config',
          baseDir
        );

        // 跳转至目录
        cd(PROJECT_NAME);
        await $`git init`;

        // 执行安装命令
        await $`yarn`;

        break;

      default:
        break;
    }
    // 输出创建成功的命令
    console.log(chalk.green('CreationCompleted!'));
  } catch (error) {
    console.log(chalk.red(`Create objet defeat: ${error}`));
  }
};
