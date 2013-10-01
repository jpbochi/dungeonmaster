(function () {
  'use strict';
  /*global GLOBAL,before,beforeEach,afterEach,after*/

  var fs = require('fs');
  var requirejs = require('requirejs');

  GLOBAL.expect = require('chai').expect;

  (function requireRecursively(initialPath) {
    fs.readdirSync(initialPath)
      .map(function (path) { return initialPath + path; })
      .forEach(function (path) {
        if (fs.statSync(path).isDirectory()) {
          requireRecursively(path + '/');
        } else
        if (path.match(/\_tests\.js$/)) {
          console.log(path);
          requirejs(path);
        }
      });
  })('./tests/');
})();
