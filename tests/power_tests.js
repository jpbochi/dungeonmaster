define(function (require) {
  var power = require('lib/power.js');

  describe.only('a power', function () {
    it('has a name', function () {
      var breath = power('dragon_breath');

      expect(breath.name()).to.equal('dragon_breath');
    });
  });
});
