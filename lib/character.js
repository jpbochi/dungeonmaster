define([
  'lodash',
  'lib/util.js',
  'lib/creature.js',
  'lib/damage.js',
  'lib/power.js'
],
/* jshint -W072 *///too many parameters
function (_, util, creature, damage, power) {
/* jshint +W072 */
  'use strict';

  return function (name, level) {
    var self = _.extend(
      creature(name || 'unnamed character', level),
      {
        env: util.property(util.env()),
        race: util.property('human'),
        initiative: function () {
          return self.halfLevel() + self.dexMod();
        },
        wield: util.property(),
        action: function (action) {
          return self.env().action(self, action);
        }
      }
    );

    self.inspect = function () {
      return '[' + self.name() + ', ' + self.race() + ', lvl ' + self.level() + ']';
    };

    return self;
  };
});
