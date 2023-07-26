#!/usr/bin/env zx

require('zx/globals');
const fs = require('fs');
const path = require('path');
const { errorHandler } = require('../utils/common');
const { copyDir } = require('../utils/common');

module.exports = async (answers) => {
  try {
    const { PROJECT_NAME, PROJECT_AUTHOR, PROJECT_DESCRIPTION } = answers;
    const baseDir = `${process.cwd()}/${PROJECT_NAME}`;
    copyDir(path.resolve(__dirname, '..') + '/default-dir', baseDir, (a) => {
      console.log(a, '11111111111');
    });

    // 跳转到新目录
    cd(PROJECT_NAME);
    // 安装插件
    await $`yarn add -D husky`;
    // 往package.json文件添加自定义内容
    const baseUrl = path.resolve(process.cwd(), 'package.json');
    fs.readFile(
      baseUrl,
      {
        encoding: 'utf-8',
      },
      (err, data) => {
        if (err) {
          errorHandler({
            type: 'Create objet defeat! The error message is: ',
            err,
          });
        } else {
          const origin = JSON.parse(data);

          // 添加脚本
          origin.scripts = {
            ...origin.scripts,
            prepare: 'husky install',
          };
          // 设置基本信息
          const content = {
            name: PROJECT_NAME,
            author: PROJECT_AUTHOR,
            description: PROJECT_DESCRIPTION,
            ...origin,
          };
          // 将内容重新写入package.json
          fs.writeFile(
            baseUrl,
            JSON.stringify(content, null, '\t'),
            {
              encoding: 'utf-8',
            },
            (err) => {
              err &&
                errorHandler({
                  type: 'Create objet defeat! The error message is: ',
                  err,
                });
            }
          );
        }
      }
    );
  } catch (error) {
    errorHandler({
      type: 'Create objet defeat! The error message is: ',
      error,
    });
  }
};
