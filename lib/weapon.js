define(['lodash', 'lib/util.js', 'lib/item.js'], function (_, util, item) {
  'use strict';

  return function () {
    var weapon = _.extend(
      item.apply(null, arguments),
      {
        damage: util.property(''),
        profBonus: util.property(0)
      }
    );

    return weapon;
  };
});
