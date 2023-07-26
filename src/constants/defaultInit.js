// 定义 package.json 内容
const PACKAGE_CONTENT = {
  name: 'package.json',
  content: JSON.stringify({
    version: '1.0.0',
    main: 'index.js',
    scripts: {
      lint: 'npm run lint:js && tsc',
      'lint-staged': 'lint-staged',
      'lint-staged:js': 'eslint --ext .js,.jsx,.ts,.tsx ',
      'lint:fix':
        'eslint --fix --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src',
      'lint:js': 'eslint --cache --ext .js,.jsx,.ts,.tsx --format=pretty ./src',
      prepare: 'husky install',
      prettier: 'prettier --check --write "src/**/*"',
    },
    'lint-staged': {
      '**/*.{js,jsx,ts,tsx}': 'npm run lint-staged:js',
      '**/*.{js,jsx,tsx,ts,css,less,scss,sass,md,json}': ['prettier --write'],
    },
    keywords: [],
    license: 'ISC',
    devDependencies: {
      '@typescript-eslint/parser': '^5.10.0',
      '@types/babel__core': '^7.1.17',
      '@umijs/fabric': '^2.5.6',
      eslint: '^7',
      'eslint-config-prettier': '^8.5.0',
      'eslint-import-resolver-typescript': '^2.5.0',
      'eslint-plugin-import': '^2.25.4',
      husky: '>=6',
      'lint-staged': '>=10',
    },
  }),
};

module.exports = {
  PACKAGE_CONTENT,
};
