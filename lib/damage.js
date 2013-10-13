define(function () {
  'use strict';

  var parser = /^(\d+d\d+)([+-]\d+)?$/;

  var withSign = function (bonus) {
    if (bonus === 0) { return ''; }
    if (bonus < 0) { return bonus.toString(); }
    return '+' + bonus;
  };

  return function damage(value) {
    var self = {
      toString: function () {
        return value;
      },
      base: function () {
        var parsed = parser.exec(value);
        if (!parsed) { return ''; }
        return parser.exec(value)[1];
      },
      bonus: function () {
        var parsed = parser.exec(value);
        if (!parsed) { return 0; }
        return parseInt(parsed[2] || 0, 10);
      },
      addBonus: function (bonus) {
        var newBonus = self.bonus() + bonus;
        return damage(self.base() + withSign(newBonus));
      }
    };
    return self;
  };
});
