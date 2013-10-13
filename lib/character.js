define(['lodash', 'lib/util.js', 'lib/creature.js', 'lib/damage.js'],
/* jshint -W072 *///too many parameters
function (_, util, creature, damage) {
/* jshint +W072 */
  'use strict';

  return function (name, level) {
    var wielding;

    var char = _.extend(
      creature(name || 'unnamed character', level),
      {
        race: util.property('human'),
        wield: function (weapon) {
          wielding = weapon;
          return this;
        },
        actions: function () {
          return ['basic_melee_attack'];
        },
        action: function (action) {
          return {
            usage: 'at-will',
            timeCost: 'standard',
            type: 'melee_weapon',
            target: 'one_creature',
            bonus: function () {
              return char.halfLevel() + char.strMod();
            },
            defense: 'AC',
            keywords: ['martial', 'weapon'],
            hit: {
              damage: function () {
                return damage(wielding.damage()).addBonus(char.strMod()).toString();
              }
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
