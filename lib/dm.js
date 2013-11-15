define([
  'lodash',
  'lib/character.js',
  'lib/weapon.js',
  'lib/damage.js',
  'modules/basic_actions.js'
],
/* jshint -W072 *///too many parameters
function (_, character, weapon, damage, actions) {
/* jshint +W072 */
  'use strict';

  var buildModules = function (modules) {
    var actions = _.chain(modules).pluck('actions').flatten().value();

    return {
      action: function (character, actionName) {
        var actionDef = _.find(
          actions,
          function (actionDef) { return actionDef.predicate(character, actionName); }
        );

        if (!actionDef) { return null; }
        return actionDef.action(character);
      }
    };
  };

  var modules = [ actions ];
  var env = buildModules(modules);

  var self = {
    modules: function () {
      return modules;
    },
    character: function () {
      var char = character.apply(null, _.toArray(arguments));
      char.env(env);
      return char;
    },
    weapon: weapon,
    damage: damage
  };

  return self;
});
