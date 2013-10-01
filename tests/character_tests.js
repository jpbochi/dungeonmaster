define(function (require) {
  var character = require('lib/character.js');

  describe('a character', function () {
    it('has a name', function () {
      var bob = character('bob');

      expect(bob.name()).to.equal('bob');
    });

    it('has a race', function () {
      var bob = character();

      expect(bob.race()).to.equal('human');
      expect(bob.race('elf')).to.equal('elf');
    });

    it('can be inspected', function () {
      var bob = character('bob');
      bob.race('halfling');

      expect(bob.inspect()).to.equal('[bob, halfling]');
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

      describe('modifiers', function () {
        [
          { abl:  1, mod: -5 },
          { abl:  2, mod: -4 }, { abl: 3, mod: -4 },
          { abl:  4, mod: -3 }, { abl: 5, mod: -3 },
          { abl:  6, mod: -2 }, { abl: 7, mod: -2 },
          { abl:  8, mod: -1 }, { abl: 9, mod: -1 },
          { abl: 10, mod: 0 }, { abl: 11, mod: 0 },
          { abl: 12, mod: 1 }, { abl: 13, mod: 1 },
          { abl: 14, mod: 2 }, { abl: 15, mod: 2 },
          { abl: 16, mod: 3 }, { abl: 17, mod: 3 },
          { abl: 18, mod: 4 }, { abl: 19, mod: 4 }
        ].forEach(function (test) {
          it('is ' + test.mod + ' for ability score of ' + test.abl, function () {
            var bob = character();

            bob.str(test.abl);
            expect(bob.strMod()).to.equal(test.mod);

            bob.dex(test.abl);
            expect(bob.dexMod()).to.equal(test.mod);
          });
        });
      });
    });
  });
});