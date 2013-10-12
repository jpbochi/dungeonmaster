define(['lodash', 'lib/util.js', 'lib/creature.js'],
function (_, util, creature) {
  'use strict';

  return function (name, level) {
    var char = _.extend(
      creature(name || 'unnamed character', level),
      {
        race: util.property('human')
      }
    );

    char.inspect = function () {
      return '[' + char.name() + ', ' + char.race() + ', lvl ' + char.level() + ']';
    };

    return char;
  };
});
