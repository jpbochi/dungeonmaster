define(['lib/util.js', 'lib/power.js', 'lib/damage.js'], function (util, power, damage) {
  'use strict';

  var basicMeleeAttack = function (character, weapon) {
    var attack = power('melee_basic_attack')
      .usage('at-will')
      .timeCost('standard')
      .type('melee_weapon')
      .target('one_creature')
      .keywords(['weapon'])
      .defense('AC');

    attack.bonus = function () {
      return damage(weapon.damage()).bonus() + character.halfLevel() + character.strMod();
    };
    attack.hitDamage = function () {
      return damage(weapon.damage()).addBonus(character.strMod()).toString();
    };
    return attack;
  };

  var basicRangedAttack = function (character, weapon) {
    var attack = power('melee_basic_attack')
      .usage('at-will')
      .timeCost('standard')
      .type('ranged_weapon')
      .target('one_creature')
      .keywords(['weapon'])
      .defense('AC');

    attack.bonus = function () {
      return damage(weapon.damage()).bonus() + character.halfLevel() + character.dexMod();
    };
    attack.hitDamage = function () {
      return damage(weapon.damage()).addBonus(character.dexMod()).toString();
    };
    return attack;
  };

  return {
    extend: function (dm) {
      dm.around('character', function (base) {
        var self = base.apply(this, [].slice.call(arguments, 1));

        util.advice.call(self);
        self.around('action', function (base, action) {
          var wielding = self.wield();

          if (wielding) {
            if (action === 'basic_melee_attack' && wielding.hasTag('melee')) {
              return basicMeleeAttack(self, wielding);
            } else if (action === 'basic_ranged_attack' && wielding.hasTag('ranged')) {
              return basicRangedAttack(self, wielding);
            }
          }
          return base.apply(this, [].slice.call(arguments, 1));
        });

        return self;
      });
    }
  };
});
