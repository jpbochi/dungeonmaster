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

      it('can be set individually', function () {
        var bob = character();

        expect(bob.str(10)).to.equal(10);
        expect(bob.con(11)).to.equal(11);
        expect(bob.dex(12)).to.equal(12);
        expect(bob.int(13)).to.equal(13);
        expect(bob.wis(14)).to.equal(14);
        expect(bob.cha(16)).to.equal(16);
      });
    });
  });
});