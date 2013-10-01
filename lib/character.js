define(['lodash'], function (_) {
  'use strict';

  var ABILITIES = ['str', 'con', 'dex', 'int', 'wis', 'cha'];

  return function () {
    var abilities = {
      str: 10,
      con: 10,
      dex: 10,
      int: 10,
      wis: 10,
      cha: 10
    };

    var char = {
      race: function () { return 'human'; },
      abilities: function (vals) {
        _.zip(ABILITIES, vals).forEach(function (pair) {
          abilities[pair[0]] = pair[1];
        });
      }
    };

    ABILITIES.forEach(function (ability) {
      char[ability] = function () {
        return abilities[ability];
      };
    });

    return char;
  };
});