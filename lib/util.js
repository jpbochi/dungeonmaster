define(['advice', 'bilby', 'lodash'], function (advice, bilby, _) {
  'use strict';

  return {
    property: function (currentValue) {
      return function (value) {
        if (arguments.length) {
          currentValue = value;
          return this;
        }
        return _.isFunction(currentValue) ? currentValue() : currentValue;
      };
    },
    advice: advice,
    bilby: bilby,
    env: bilby.environment
  };
});
