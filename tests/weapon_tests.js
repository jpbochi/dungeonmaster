define(function (require) {
  var weapon = require('lib/weapon.js');

  describe('an weapon', function () {
    it('has a name', function () {
      var sling = weapon('sling');

      expect(sling.name()).to.equal('sling');
    });

    it('is an item', function () {
      var w = weapon();

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

    it('has proficience bonus', function () {
      var shortsword = weapon('shortsword');

      expect(shortsword.profBonus()).to.equal(0);
      expect(shortsword.profBonus(3)).to.equal(shortsword);
      expect(shortsword.profBonus()).to.equal(3);
    });
  });
});
