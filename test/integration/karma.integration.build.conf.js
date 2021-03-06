// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-05-31 using
// generator-karma 0.8.1

module.exports = function(config) {
  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine', 'requirejs'],

    // list of files / patterns to load in the browser
    files: [
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Safari',
      'PhantomJS',
      'Chrome',
      'Firefox',
      'Opera'
    ],

    // Which plugins to enable
    plugins: [
      'karma-jasmine',
      'karma-requirejs',
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-safari-launcher',
      'karma-firefox-launcher',
      'karma-opera-launcher',
      'karma-junit-reporter',
      'karma-coverage'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    reporters: ['progress', 'junit', 'coverage'],

    junitReporter: {
      outputFile: './test/reports/unit/unit-tests.xml'
    },

    coverageReporter: {
      type : 'html',
      // where to store the report
      dir : './test/reports/unit/coverage/'
    },

    preprocessors: {
      './src/scripts/**/*.js': ['coverage']
    }

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlSegment1: '_karma_'
  });
};