define(function (require) {
  var character = require('lib/character.js');

  describe('a character', function () {
    it('has a race', function () {
      var bob = character();

      expect(bob.race()).to.equal('human');
    });
  });
});