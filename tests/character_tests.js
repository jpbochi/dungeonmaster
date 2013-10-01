define(function (require) {
  var character = require('lib/character.js');

  describe('a character', function () {
    it('has a race', function () {
      var bob = character();

      expect(bob.race()).to.equal('human');
    });

    describe('abilities', function () {
      it('has strengh, constitution, dexterity, intelligence, wisdom, and charisma', function () {
        var bob = character();

        bob.abilities([16, 14, 13, 12, 11, 10]);

        expect(bob.str()).to.equal(16);
        expect(bob.con()).to.equal(14);
        expect(bob.dex()).to.equal(13);
        expect(bob.int()).to.equal(12);
        expect(bob.wis()).to.equal(11);
        expect(bob.cha()).to.equal(10);
      });
    });
  });
});