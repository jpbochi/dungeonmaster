define(function () {
  'use strict';

  return {
    property: function (initialValue) {
      return function (value) {
        if (arguments.length) {
          initialValue = value;
          return this;
        }
        return initialValue;
      };
    }
  };
});
