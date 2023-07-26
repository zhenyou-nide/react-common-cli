#!/usr/bin/env zx

require('zx/globals');
const inquirer = require('inquirer');
const { DEFAULT_QUESTIONS } = require('../constants/questions');
const defaultCreateHandler = require('./default');
const customCreateHandler = require('./custom');

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
        await defaultCreateHandler(DEFAULT_QUESTIONS);
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
