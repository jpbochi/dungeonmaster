define(['lodash', 'lib/util.js', 'lib/with_abilities.js'],
function (_, util, withAbilities) {
  'use strict';

  return function (name, level) {
    name = name || 'unnamed';
    level = level || 1;

    var char = {
      name: function () {
        return name;
      },
      race: util.property('human'),
      level: function () {
        return level;
      },
      halfLevel: function () {
        return Math.floor(level / 2);
      },
    };

    char.inspect = function () {
      return '[' + name + ', ' + char.race() + ' lvl ' + level + ']';
    };

    return withAbilities(char);
  };
});