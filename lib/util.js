define(['advice', 'bilby', 'lodash'], function (advice, bilby, _) {
  'use strict';


  return {
    property: function (currentValue) {
      var prop = function (value) {
        if (arguments.length) {
          currentValue = value;
          return this;
        }
        return _.isFunction(currentValue) ? currentValue() : currentValue;
      };
      prop.withDefault = function (defaultValue) {
        return function () {
          return prop.apply(this, arguments) || defaultValue;
        };
      };
      return prop;
    },
    advice: advice,
    bilby: bilby,
    env: bilby.environment
  };
});
