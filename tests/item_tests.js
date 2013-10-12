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
      expect(dagger.weight(1)).to.equal(dagger);
      expect(dagger.weight()).to.equal(1);
    });

    it('has a price', function () {
      var spellbook = item();

      expect(spellbook.price()).to.equal(null);
      expect(spellbook.price(50)).to.equal(spellbook);
      expect(spellbook.price()).to.equal(50);
    });

    describe('tags', function () {
      function longsword() {
        return item().withTags('weapon', 'one-handed', 'heavy-blade', 'military', 'versatile');
      }

      it('can be consulted', function () {
        expect(longsword().hasTag('versatile')).to.be.true;
        expect(longsword().hasTag('implement')).to.be.false;
      });
    });
  });
});
