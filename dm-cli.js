(function () {
  'use strict';
  var repl = require('repl');
  var requirejs = require('requirejs');

  var context = repl.start({
    'prompt': '% '
  }).context;

  context.dm = requirejs('lib/dm.js');
})();