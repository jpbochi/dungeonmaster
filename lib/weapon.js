define(['lodash', 'lib/util.js', 'lib/item.js', 'lib/damage.js'],
/* jshint -W072 *///too many parameters
function (_, util, item, damage) {
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

    //TODO: this seems like a complicated computed value.
    // How about a baseDamage property and a computed damage?
    util.advice.call(weapon);
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
