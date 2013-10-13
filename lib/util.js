define(['advice'], function (advice) {
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
    },
    advice: advice
  };
});
