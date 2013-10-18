define(['lib/util.js', 'lib/power.js', 'lib/damage.js'], function (util, power, damage) {
  'use strict';

  var basicMeleeAttack = function (character) {
    var weapon = character.wield();
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

  var basicRangedAttack = function (character) {
    var weapon = character.wield();
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

  var actionWielding = function (action, wieldingTag) {
    return function (character, action) {
      var wielding = character.wield();
      return action === action && wielding && wielding.hasTag(wieldingTag);
    };
  };

  var env = util.env()
  .method(
    'action',
    actionWielding('basic_melee_attack', 'melee'),
    basicMeleeAttack
  ).method(
    'action',
    actionWielding('basic_ranged_attack', 'ranged'),
    basicRangedAttack
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
