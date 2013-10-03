define(function (require) {
  var item = require('lib/item.js');

  describe('an item', function () {
    it('has a name', function () {
      var sword = item('longsword');

      expect(sword.name()).to.equal('longsword');
    });
  });
});