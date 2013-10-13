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
        return weapon('magic maul').damage('2d6').enhancement(2).withTags('melee');
      }

      function anArmedCharacter() {
        var b = character();
        b.wield(aWeapon());
        return b;
      }

      describe('melee basic attack PHB (pg287)', function () {
        var bob, attack;

        beforeEach(function () {
          bob = anArmedCharacter();
        });

        function basicAttack() {
          return bob.action('melee_basic_attack');
        }

        it.skip('is available'); //not sure what's the best interface for that yet

        it('is defended with AC', function () {
          expect(basicAttack().defense()).to.equal('AC');
        });

        it('can be used at-will', function () {
          expect(basicAttack().usage()).to.equal('at-will');
        });

        it('has Weapon keywords', function () {
          expect(basicAttack().keywords()).to.eql(['weapon']);
        });

        it('its type is melee weapon', function () {
          expect(basicAttack().type()).to.equal('melee_weapon');
        });

        it('targets one creature', function () {
          expect(basicAttack().target()).to.equal('one_creature');
        });

        it('is a standard action', function () {
          expect(basicAttack().timeCost()).to.equal('standard');
        });

        describe('hit', function () {
          it('damage is 1[W] when char has no bonus', function () {
            expect(basicAttack().hitDamage()).to.equal('2d6+2');
          });

          it('damage is 1[W] + Strength', function () {
            bob.str(18);
            expect(basicAttack().hitDamage()).to.equal('2d6+6');
          });

          it.skip('damage is 2[W] + Strength when lvl>=21', function () {
            bob.level(21);
            expect(basicAttack().hitDamage()).to.equal('4d6+6');
          });
        });

        describe('attack bonus', function () {
          it('includes weapon bonus', function () {
            expect(basicAttack().bonus()).to.equal(2);
          });

          it('includes half level', function () {
            bob.level(11);
            expect(basicAttack().bonus()).to.equal(2 + 5);
          });

          it('includes strengh modifier', function () {
            bob.str(16);
            expect(basicAttack().bonus()).to.equal(2 + 3);
          });
        });
      });
    });
  });
});
