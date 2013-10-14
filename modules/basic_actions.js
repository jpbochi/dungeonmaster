define(['lib/util.js', 'lib/power.js', 'lib/damage.js'], function (util, power, damage) {
  'use strict';

  return {
    extendCharacter: function (character) {
      return function () {
        var self = character.apply(this, [].slice.call(arguments));

        util.advice.call(self);
        self.around('action', function (base, action) {
          var wielding = self.wield();

          if (wielding) {
            if (action === 'melee_basic_attack' && wielding.hasTag('melee')) {
              var attack = power('melee_basic_attack')
                .usage('at-will')
                .timeCost('standard')
                .type('melee_weapon')
                .target('one_creature')
                .keywords(['weapon'])
                .defense('AC');

              attack.bonus = function () {
                return damage(wielding.damage()).bonus() + self.halfLevel() + self.strMod();
              };
              attack.hitDamage = function () {
                return damage(wielding.damage()).addBonus(self.strMod()).toString();
              };
              return attack;
            }
          }
          return base.apply(this, [].slice.call(arguments, 1));
        });

        return self;
      };
    }
  };
});
