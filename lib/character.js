define(['lodash', 'lib/util.js', 'lib/creature.js'],
function (_, util, creature) {
  'use strict';

  return function (name, level) {
    var wielding;

    var char = _.extend(
      creature(name || 'unnamed character', level),
      {
        race: util.property('human'),
        wield: function (weapon) {
          wielding = weapon;
        },
        actions: function () {
          return ['basic_melee_attack'];
        },
        action: function (action) {
          return {
            bonus: char.halfLevel(),
            hit: {
              damage: wielding.damage()
            }
          };
        }
      }
    );

    char.inspect = function () {
      return '[' + char.name() + ', ' + char.race() + ', lvl ' + char.level() + ']';
    };

    return char;
  };
});
