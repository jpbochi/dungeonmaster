define(function (require) {
  var damage = require('lib/damage.js');

  describe('a damage', function () {
    it('can be converted to string', function () {
      expect(damage('3d12+5').toString()).to.equal('3d12+5');
    });

    it('has a base value', function () {
      expect(damage('2d8+4').base()).to.equal('2d8');
    });

    it('has a bonus value', function () {
      expect(damage('2d8+4').bonus()).to.equal(4);
      expect(damage('2d6-1').bonus()).to.equal(-1);
    });

    it('can have a bonus added', function () {
      expect(damage('1d4').addBonus(6).toString()).to.equal('1d4+6');
      expect(damage('1d6+2').addBonus(3).toString()).to.equal('1d6+5');
      expect(damage('1d8+1').addBonus(-4).toString()).to.equal('1d8-3');
      expect(damage('1d10-1').addBonus(3).toString()).to.equal('1d10+2');
    });
  });
});
