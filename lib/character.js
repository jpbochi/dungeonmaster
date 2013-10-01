define(['lodash', 'lib/with_abilities.js'],
function (_, withAbilities) {
  'use strict';

  return function (name, level) {
    var race = 'human';
    name = name || 'unnamed';
    level = level || 1;

    var char = {
      name: function () {
        return name;
      },
      race: function (value) {
        if (arguments.length) { race = value; }
        return race;
      },
      level: function () {
        return level;
      },
      halfLevel: function () {
        return Math.floor(level / 2);
      },
    };

    char.inspect = function () {
      return '[' + name + ', ' + race + ' lvl ' + level + ']';
    };

    return withAbilities(char);
  };
});