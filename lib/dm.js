define([
  'lib/util.js',
  'lib/character.js',
  'lib/weapon.js',
  'lib/damage.js',
  'modules/basic_actions.js'
],
/* jshint -W072 *///too many parameters
function (util, character, weapon, damage, actions) {
/* jshint +W072 */
  'use strict';

  var self = {
    character: character,
    weapon: weapon,
    damage: damage
  };

  util.advice.call(self);
  actions.extend(self);

  return self;
});
