define(function (require) {
  var weapon = require('lib/weapon.js');

  describe('an weapon', function () {
    it.skip('is an item', function () {
      var weapon = weapon();

      expect(weapon.name).to.instanceOf(Function);
      expect(weapon.weight).to.instanceOf(Function);
      expect(weapon.price).to.instanceOf(Function);
      expect(weapon.hasTag).to.instanceOf(Function);
    });

    it('does damage', function () {
      var spear = weapon('longspear');

      expect(spear.damage()).to.equal('');
      expect(spear.damage('1d10')).to.equal('1d10');
      expect(spear.damage()).to.equal('1d10');
    });
  });
});
