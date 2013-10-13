define(function () {
  'use strict';

  var parser = /^(\d+d\d+)([+-]\d+)?$/;

  var withSign = function (bonus) {
    return (bonus < 0) ? bonus.toString() : ('+' + bonus);
  };

  return function (value) {
    var damage = {
      toString: function () {
        return value;
      },
      base: function () {
        return parser.exec(value)[1];
      },
      bonus: function () {
        return parseInt(parser.exec(value)[2] || 0, 10);
      },
      addBonus: function (bonus) {
        var newBonus = damage.bonus() + bonus;
        value = damage.base() + withSign(newBonus);
        return damage;
      }
    };

    return damage;
  };
});
