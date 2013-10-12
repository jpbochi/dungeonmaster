define(['lodash', 'lib/util.js', 'lib/with_abilities.js'],
function (_, util, withAbilities) {
  'use strict';

  return function (name, level) {
    name = name || 'unnamed creature';

    var creature = {
      name: function () {
        return name;
      },
      level: util.property(level || 1),
      halfLevel: function () {
        return Math.floor(creature.level() / 2);
      }
    };

    creature.inspect = function () {
      return '[' + name + ', lvl ' + level + ']';
    };

    return withAbilities(creature);
  };
});
