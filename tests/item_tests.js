define(function (require) {
  var item = require('lib/item.js');

  describe('an item', function () {
    it('has a name', function () {
      var sword = item('longsword');

      expect(sword.name()).to.equal('longsword');
    });

    it('has a weight', function () {
      var dagger = item();

      expect(dagger.weight()).to.equal(0);
      expect(dagger.weight(1)).to.equal(1);
      expect(dagger.weight()).to.equal(1);
    });
  });
});