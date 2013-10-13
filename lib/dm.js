define(['lib/character', 'lib/weapon', 'lib/damage'],
/* jshint -W072 *///too many parameters
function (character, weapon, damage) {
/* jshint +W072 */
  'use strict';

  return {
    character: character,
    weapon: weapon,
    damage: damage
  };
});
