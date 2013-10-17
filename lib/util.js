define(['advice', 'bilby'], function (advice, bilby) {
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
    advice: advice,
    bilby: bilby,
    env: bilby.environment
  };
});
