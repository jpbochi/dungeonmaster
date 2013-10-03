define(['lodash'], function (_) {
  'use strict';

  return function (name) {
    return {
      name: function () { return name; }
    };
  };
});