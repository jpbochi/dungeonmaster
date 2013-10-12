define(['lodash', 'lib/util.js', 'lib/item.js'], function (_, util, item) {
  'use strict';

  return function () {
    var weapon = {
      damage: util.property('')
    };

    return weapon;
  };
});
