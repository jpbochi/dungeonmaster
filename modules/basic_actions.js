define(['lib/util.js', 'lib/power.js', 'lib/damage.js'], function (util, power, damage) {
  'use strict';

  var basicMeleeAttack = function (character, weapon) {
    return power('melee_basic_attack')
      .usage('at-will')
      .timeCost('standard')
      .type('melee_weapon')
      .target('one_creature')
      .keywords(['weapon'])
      .defense('AC')
      .bonus(function () {
        return damage(weapon.damage()).bonus() + character.halfLevel() + character.strMod();
      })
      .hitDamage(function () {
        return damage(weapon.damage()).addBonus(character.strMod()).toString();
      });
  };

  var basicRangedAttack = function (character, weapon) {
    return power('melee_basic_attack')
      .usage('at-will')
      .timeCost('standard')
      .type('ranged_weapon')
      .target('one_creature')
      .keywords(['weapon'])
      .defense('AC')
      .bonus(function () {
        return damage(weapon.damage()).bonus() + character.halfLevel() + character.dexMod();
      })
      .hitDamage(function () {
        return damage(weapon.damage()).addBonus(character.dexMod()).toString();
      });
  };

  var env = util.env()
  .method(
    'action',
    function (character, action) {
      var wielding = character.wield();
      return action === 'basic_melee_attack' && wielding && wielding.hasTag('melee');
    },
    function (character) {
      var wielding = character.wield();
      return basicMeleeAttack(character, wielding);
    }
  ).method(
    'action',
    function (character, action) {
      var wielding = character.wield();
      return action === 'basic_ranged_attack' && wielding && wielding.hasTag('ranged');
    },
    function (character) {
      var wielding = character.wield();
      return basicRangedAttack(character, wielding);
    }
  ).method(
    'action',
    util.bilby.constant(true),
    util.bilby.constant(null)
  );

  return {
    extend: function (dm) {
      dm.around('character', function (base) {
        var self = base.apply(this, [].slice.call(arguments, 1));

        self.env(env);

        return self;
      });
    }
  };
});
