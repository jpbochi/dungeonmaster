define([
  'lodash',
  'lib/util.js',
  'lib/creature.js',
  'lib/damage.js',
  'lib/power.js'
],
/* jshint -W072 *///too many parameters
function (_, util, creature, damage, power) {
/* jshint +W072 */
  'use strict';

  return function (name, level) {
    var wielding;

    var self = _.extend(
      creature(name || 'unnamed character', level),
      {
        race: util.property('human'),
        wield: function (weapon) {
          wielding = weapon;
          return this;
        },
        action: function (action) {
          var attack = power('melee_basic_attack')
            .usage('at-will')
            .timeCost('standard')
            .type('melee_weapon')
            .target('one_creature')
            .keywords(['weapon']);

          attack.bonus = function () {
            return damage(wielding.damage()).bonus() + self.halfLevel() + self.strMod();
          };
          attack.defense('AC');
          attack.hitDamage = function () {
            return damage(wielding.damage()).addBonus(self.strMod()).toString();
          };
          return attack;
        }
      }
    );

    self.inspect = function () {
      return '[' + self.name() + ', ' + self.race() + ', lvl ' + self.level() + ']';
    };

    return self;
  };
});
