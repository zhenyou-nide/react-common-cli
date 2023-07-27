#! /usr/bin/env node

const process = require('process');
const { program } = require('commander');
const packageJson = require('../package.json');
const { run } = require('../src/create/index');

const main = () => {
  const argvs = process.argv.slice(2);
  const processArgv =
    process.argv?.length <= 2 ? [...process.argv, '-h'] : process.argv;
  program
    .option('-v, --version', "get the tool's version information")
    .option('-u, --update [version]', 'update react-common-cli')
    .option('-c, --create', 'create project')
    .parse(processArgv);

  argvs.forEach((key) => {
    switch (key) {
      case '-v':
      case '--version':
        program.version(`v${packageJson.version}`).parse(process.argv);
        break;
      case '-c':
      case '--create':
        run();
        break;
      default:
        break;
    }
  });
};
main();
