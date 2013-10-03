define(['lib/util.js'], function (util) {
  'use strict';

  return function (name) {
    return {
      name: function () { return name; },
      weight: util.property(0),
      price: util.property(null)
    };
  };
});