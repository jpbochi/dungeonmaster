define(['lodash'], function (_) {
  'use strict';

  var ABILITIES = ['str', 'con', 'dex', 'int', 'wis', 'cha'];

  var abilityModifier = function (value) {
    return Math.floor((value - 10) / 2);
  };

  return function (obj) {
    var abilities = {
      str: 10,
      con: 10,
      dex: 10,
      int: 10,
      wis: 10,
      cha: 10
    };

    ABILITIES.forEach(function (ability) {
      obj[ability] = function (value) {
        if (arguments.length) {
          abilities[ability] = value;
          return this;
        }
        return abilities[ability];
      };

      obj[ability + 'Mod'] = function () {
        return abilityModifier(abilities[ability]);
      };
    });

    obj.abilities = function (values) {
      _.zip(ABILITIES, values).forEach(function (pair) {
        abilities[pair[0]] = pair[1];
      });
    };

    return obj;
  };
});
