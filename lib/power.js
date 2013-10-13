define(['lib/util.js', 'lib/damage.js'], function (util, damage) {
  'use strict';

  return function (name) {
    return {
      name: function () {
        return name;
      }
    };
  };
});
