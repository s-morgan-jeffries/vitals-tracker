var tests = [];
for (var file in window.__karma__.files) {
  if (window.__karma__.files.hasOwnProperty(file)) {
    if (/Spec\.js$/.test(file)) {
      tests.push(file);
//      console.log('HELLLOOOO!!!');
//      console.log(tests);
//      console.log(window.__karma__);
    }
  }
}
//console.log(window.__karma__);
//console.log(window.__karma__.files);

requirejs.config({
  // Karma serves files from '/base'
  baseUrl: '/base/src/scripts',

//  map: {
//    '*': {
//      message: 'mockMessage'
//    }
//  },
  paths: {
    customParsers: 'mixins/customParsers',
    Squire: '../../node_modules/squirejs/src/Squire'
  }

});


require(tests, function () {
  window.__karma__.start();
});