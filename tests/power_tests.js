define(function (require) {
  var power = require('lib/power.js');

  describe('a power', function () {
    it('has a name', function () {
      var breath = power('dragon_breath');

      expect(breath.name()).to.equal('dragon_breath');
    });

    it('has lots of properties', function () {
      var elven = power('elven_accuracy');

      expect(elven.usage).to.instanceOf(Function);
      expect(elven.timeCost).to.instanceOf(Function);
      expect(elven.type).to.instanceOf(Function);
      expect(elven.target).to.instanceOf(Function);

      //TODO: not all powers will have these. move them somewhere else
      expect(elven.bonus).to.instanceOf(Function);
      expect(elven.defense).to.instanceOf(Function);
      expect(elven.keywords).to.instanceOf(Function);
      expect(elven.hitDamage).to.instanceOf(Function);
    });
  });
});
