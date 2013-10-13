define(['lib/util.js', 'lib/damage.js'], function (util, damage) {
  'use strict';

  return function (name) {
    return {
      name: function () {
        return name;
      },
      usage: util.property(),
      timeCost: util.property(),
      type: util.property(),
      target: util.property(),
      bonus: util.property(),
      defense: util.property(),
      keywords: util.property(),
      hitDamage: util.property()
    };
  };
});
