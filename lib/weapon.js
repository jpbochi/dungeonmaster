define(['lodash', 'lib/util.js', 'lib/item.js'], function (_, util, item) {
  'use strict';

  return function (name) {
    name = name || 'unnamed weapon';
    var weapon = _.extend(
      item(name),
      {
        damage: util.property(''),
        profBonus: util.property(0)
      }
    );

    return weapon;
  };
});
