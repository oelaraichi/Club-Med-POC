module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: [
      'tests/hooks/**/*.ts',
      'tests/step-definitions/**/*.ts'
    ],
    paths: ['tests/features/**/*.feature'],
    format: [
      'progress-bar',
      'allure-cucumberjs/reporter'
    ],
    formatOptions: {
      resultsDir: 'reports/allure-results'
    },
    publishQuiet: true,
    parallel: 1
  }
};
