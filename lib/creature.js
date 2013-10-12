define(['lodash', 'lib/util.js', 'lib/with_abilities.js'],
function (_, util, withAbilities) {
  'use strict';

  return function (name, level) {
    name = name || 'unnamed creature';
    level = level || 1;

    var creature = {
      name: function () {
        return name;
      },
      level: function () {
        return level;
      },
      halfLevel: function () {
        return Math.floor(level / 2);
      }
    };

    creature.inspect = function () {
      return '[' + name + ', lvl ' + level + ']';
    };

    return withAbilities(creature);
  };
});
