define([
  'lib/util.js',
  'lib/power.js',
  'lib/damage.js',
  'lodash'
], function (util, power, damage, _) {
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

  var actions = [
    {
      predicate: actionWielding('basic_melee_attack', 'melee'), //#basic_melee_attack hand.melee
      action: basicMeleeAttack
    },
    {
      predicate: actionWielding('basic_ranged_attack', 'ranged'), //#basic_ranged_attack hand.ranged
      action: basicRangedAttack
    }
  ];

  return {
    actions: actions
  };
});
