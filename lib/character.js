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
        race: util.property('human'),
        wield: util.property(),
        action: function () {
          return null;
        }
      }
    );

    self.inspect = function () {
      return '[' + self.name() + ', ' + self.race() + ', lvl ' + self.level() + ']';
    };

    return self;
  };
});
