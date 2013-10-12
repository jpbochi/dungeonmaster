define(['lodash', 'lib/util.js'], function (_, util) {
  'use strict';

  function withTags(item) {
    var tags = [];

    item.withTags = function () {
      var moreTags = Array.prototype.slice.call(arguments);

      tags = _.uniq(tags.concat(moreTags), true);
      return item;
    };
    item.hasTag = function (tag) {
      return _.contains(tags, tag);
    };

    return item;
  }

  return function (name) {
    var item = {
      name: function () { return name; },
      weight: util.property(0),
      price: util.property(null),
      withTags: function () {
      }
    };

    return withTags(item);
  };
});
