define(function (require) {
  var weapon = require('lib/weapon.js');

  describe('an weapon', function () {
    it('is an item', function () {
      var w = weapon();

      expect(w.name).to.instanceOf(Function);
      expect(w.weight).to.instanceOf(Function);
      expect(w.price).to.instanceOf(Function);
      expect(w.hasTag).to.instanceOf(Function);
    });

    it('does damage', function () {
      var spear = weapon('longspear');

      expect(spear.damage()).to.equal('');
      expect(spear.damage('1d10')).to.equal(spear);
      expect(spear.damage()).to.equal('1d10');
    });
  });
});
