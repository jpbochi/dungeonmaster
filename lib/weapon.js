define(['lodash', 'advice', 'lib/util.js', 'lib/item.js', 'lib/damage.js'],
/* jshint -W072 *///too many parameters
function (_, advice, util, item, damage) {
/* jshint +W072 */
  'use strict';

  return function (name) {
    name = name || 'unnamed weapon';
    var weapon = _.extend(
      item(name),
      {
        damage: util.property(''),
        profBonus: util.property(0),
        enhancement: util.property(0)
      }
    );

    advice.call(weapon);
    weapon.around('damage', function (base) {
      var dmg = base.apply(this, [].slice.call(arguments, 1));

      if (_.isString(dmg)) {
        dmg = damage(dmg).addBonus(weapon.enhancement()).toString();
      }
      return dmg;
    });

    return weapon;
  };
});
