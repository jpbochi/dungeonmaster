define(function (require) {
  var character = require('lib/character.js');
  var weapon = require('lib/weapon.js');

  describe('a character', function () {
    it('has a name', function () {
      var bob = character('bob');

      expect(bob.name()).to.equal('bob');
    });

    it('has a race', function () {
      var bob = character();

      expect(bob.race()).to.equal('human');
      expect(bob.race('elf')).to.equal(bob);
      expect(bob.race()).to.equal('elf');
    });

    it('when inspected, shows name, level and race', function () {
      var bob = character('bob');
      bob.race('halfling');

      expect(bob.inspect()).to.equal('[bob, halfling, lvl 1]');
    });

    describe('level', function () {
      it('starts at one', function () {
        expect(character().level()).to.equal(1);
      });

      it('can be initialised', function () {
        expect(character('Elminster', 24).level()).to.equal(24);
      });

      describe('half level modifier', function () {
        [
          { lvl:  1, mod: 0 },
          { lvl:  2, mod: 1 }, { lvl: 3, mod: 1 },
          { lvl:  4, mod: 2 }, { lvl: 5, mod: 2 },
          { lvl:  6, mod: 3 },
        ].forEach(function (test) {
          it('is ' + test.mod + ' on level ' + test.lvl, function () {
            expect(character(null, test.lvl).halfLevel()).to.equal(test.mod);
          });
        });
      });
    });

    it('has abilities', function () {
      var bob = character();

      expect(bob.str).to.instanceOf(Function);
      expect(bob.con).to.instanceOf(Function);
      expect(bob.dex).to.instanceOf(Function);
      expect(bob.int).to.instanceOf(Function);
      expect(bob.wis).to.instanceOf(Function);
      expect(bob.cha).to.instanceOf(Function);

      expect(bob.strMod).to.instanceOf(Function);
      expect(bob.conMod).to.instanceOf(Function);
      expect(bob.dexMod).to.instanceOf(Function);
      expect(bob.intMod).to.instanceOf(Function);
      expect(bob.wisMod).to.instanceOf(Function);
      expect(bob.chaMod).to.instanceOf(Function);
    });

    describe('wielding a melee weapon', function () {
      function aWeapon() {
        return weapon('maul').damage('2d6');
      }

      function anArmedCharacter() {
        var b = character();
        b.wield(aWeapon());
        return b;
      }

      describe('basic melee attack', function () {
        var bob, attack;

        beforeEach(function () {
          bob = anArmedCharacter();
        });

        function basicAttack() {
          return bob.action('basic_melee_attack');
        }

        it('is available', function () {
          expect(bob.actions()).to.eql(['basic_melee_attack']);
        });

        it('has same damage as weapon', function () {
          expect(basicAttack().hit.damage).to.equal('2d6');
        });

        it('is defended with AC', function () {
          expect(basicAttack().defense).to.equal('AC');
        });

        it('adds half level to attack bonus', function () {
          bob.level(11);

          expect(basicAttack().bonus).to.equal(5);
        });
      });
    });
  });
});
