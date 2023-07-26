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
module.exports = { DEFAULT_QUESTIONS };
