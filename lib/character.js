define(['lodash'], function (_) {
  'use strict';

  var ABILITIES = ['str', 'con', 'dex', 'int', 'wis', 'cha'];

  var abilityModifier = function (value) {
    return Math.floor((value - 10) / 2);
  };

  return function (name) {
    var abilities = {
      str: 10,
      con: 10,
      dex: 10,
      int: 10,
      wis: 10,
      cha: 10
    };
    var race = 'human';
    name = name || 'unnamed';

    var char = {
      name: function () {
        return name;
      },
      race: function (value) {
        if (arguments.length) { race = value; }
        return race;
      },
      abilities: function (values) {
        _.zip(ABILITIES, values).forEach(function (pair) {
          abilities[pair[0]] = pair[1];
        });
      }
    };

    ABILITIES.forEach(function (ability) {
      char[ability] = function (value) {
        if (arguments.length) {
          abilities[ability] = value;
        }
        return abilities[ability];
      };

      char[ability + 'Mod'] = function () {
        return abilityModifier(abilities[ability]);
      };
    });

    char.inspect = function () {
      return '[' + name + ', ' + race + ']';
    };
    return char;
  };
});