define(function (require) {
  var dm = require('lib/dm.js');
  var character = dm.character;
  var weapon = dm.weapon;

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
        return bob.action('basic_melee_attack');
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

        it('includes Strength modifier', function () {
          bob.str(16);
          expect(basicAttack().bonus()).to.equal(2 + 3);
        });
      });
    });
  });

  describe('wielding a ranged weapon', function () {
    function aWeapon() {
      return weapon('magic longbow').damage('1d10').enhancement(1).withTags('ranged');
    }

    function anArmedCharacter() {
      var b = character();
      b.wield(aWeapon());
      return b;
    }

    describe('ranged basic attack PHB (pg287)', function () {
      var bob, attack;

      beforeEach(function () {
        bob = anArmedCharacter();
      });

      function basicAttack() {
        return bob.action('basic_ranged_attack');
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

      it('its type is ranged weapon', function () {
        expect(basicAttack().type()).to.equal('ranged_weapon');
      });

      it('targets one creature', function () {
        expect(basicAttack().target()).to.equal('one_creature');
      });

      it('is a standard action', function () {
        expect(basicAttack().timeCost()).to.equal('standard');
      });

      describe('hit', function () {
        it('damage is 1[W] when char has no bonus', function () {
          expect(basicAttack().hitDamage()).to.equal('1d10+1');
        });

        it('damage is 1[W] + Dexterity', function () {
          bob.dex(18);
          expect(basicAttack().hitDamage()).to.equal('1d10+5');
        });

        it.skip('damage is 2[W] + Dexterity when lvl>=21', function () {
          bob.level(21);
          expect(basicAttack().hitDamage()).to.equal('2d10+3');
        });
      });

      describe('attack bonus', function () {
        it('includes half level', function () {
          bob.level(13);
          expect(basicAttack().bonus()).to.equal(1 + 6);
        });

        it('includes Dexterity modifier', function () {
          bob.dex(16);
          expect(basicAttack().bonus()).to.equal(1 + 3);
        });
      });
    });
  });
});
