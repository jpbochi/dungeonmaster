define(function (require) {
  var dm = require('lib/dm.js');
  var character = dm.character;
  var weapon = dm.weapon;

  describe('melee basic attack PHB (pg287)', function () {
    describe('wielding a melee weapon', function () {
      function aWeapon() {
        return weapon('magic maul').damage('2d6').enhancement(2).withTags('melee');
      }

      function bob() {
        var b = character();
        b.wield(aWeapon());
        return b;
      }

      function basicAttack(character) {
        character = character || bob();
        return character.action('basic_melee_attack');
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
          expect(basicAttack(bob().str(18)).hitDamage()).to.equal('2d6+6');
        });

        it.skip('damage is 2[W] + Strength when lvl>=21', function () {
          expect(basicAttack(bob().level(21)).hitDamage()).to.equal('4d6+6');
        });
      });

      describe('attack bonus', function () {
        it('includes weapon bonus', function () {
          expect(basicAttack().bonus()).to.equal(2);
        });

        it('includes half level', function () {
          expect(basicAttack(bob().level(11)).bonus()).to.equal(2 + 5);
        });

        it('includes Strength modifier', function () {
          expect(basicAttack(bob().str(16)).bonus()).to.equal(2 + 3);
        });
      });
    });
  });

  describe('ranged basic attack PHB (pg287)', function () {
    describe('wielding a ranged weapon', function () {
      function aWeapon() {
        return weapon('magic longbow').damage('1d10').enhancement(1).withTags('ranged');
      }

      function bob() {
        var b = character();
        b.wield(aWeapon());
        return b;
      }

      function basicAttack(character) {
        character = character || bob();
        return character.action('basic_ranged_attack');
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
          expect(basicAttack(bob().dex(18)).hitDamage()).to.equal('1d10+5');
        });

        it.skip('damage is 2[W] + Dexterity when lvl>=21', function () {
          expect(basicAttack(bob().level(21)).hitDamage()).to.equal('2d10+3');
        });
      });

      describe('attack bonus', function () {
        it('includes half level', function () {
          expect(basicAttack(bob().level(13)).bonus()).to.equal(1 + 6);
        });

        it('includes Dexterity modifier', function () {
          expect(basicAttack(bob().dex(16)).bonus()).to.equal(1 + 3);
        });
      });
    });
  });
});
