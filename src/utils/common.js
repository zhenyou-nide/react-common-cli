#!/usr/bin/env zx

require('zx/globals');

/**
 * errorHandler
 * @param type
 * @param err
 */
const errorHandler = ({ type = 'Error: ', err = {} }) => {
  console.log(chalk.red('🚀~ type:', type, '🚀 ~ err:', err.message));
};

/**
 * copy dir
 * @param {String} from
 * @param {String} to
 */
const copyDir = (from, to, cb) => {
  // is from exist
  fs.access(from, (err) => {
    if (err) {
      errorHandler({ err });
      return;
    }
  });
  try {
    fs.readdir(from, (err, paths) => {
      if (err) throw new Error(err);
      paths.forEach((path) => {
        // 判断是否是文件夹
        fs.stat(`${from}/${path}`, (err, stat) => {
          if (err) {
            errorHandler({ type: 'Fs-stat error: ', err });
            return;
          } else {
            if (stat.isDirectory()) {
              // 如果是目录
              fs.mkdir(`${to}/${path}`, { recursive: true }, (err) => {
                if (err) {
                  errorHandler({ type: 'Copy directory error: ', err });
                  return;
                } else {
                  copyDir(`${from}/${path}`, `${to}/${path}`);
                }
              });
            } else {
              // 如果是文件
              fs.copyFile(`${from}/${path}`, `${to}/${path}`, (err) => {
                if (err) {
                  errorHandler({ type: 'Copy file error: ', err });
                  return;
                }
                // 如果是package.json文件，则将创建时填入的信息写入其中
                if (path === 'package.js') cb();
              });
            }
          }
        });
      });
    });
  } catch (err) {
    errorHandler({ err });
  }
};

module.exports = { copyDir, errorHandler };
