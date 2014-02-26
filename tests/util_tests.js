define(function (require) {
  var util = require('lib/util.js');

  describe('an property', function () {
    it('can be initialised with a value', function () {
      var prop = util.property('initial value');

      expect(prop()).to.equal('initial value');
    });

    it('accepts a function value', function () {
      var prop = util.property(function () { return 'dynamic value'; });

      expect(prop()).to.equal('dynamic value');
    });

    describe('setting a new value', function () {
      it('updates the value', function () {
        var prop = util.property('old value');
        prop('new value');

        expect(prop()).to.equal('new value');
      });

      it('returns the object that contains the property so it can be chained', function () {
        var obj = {
          prop: util.property()
        };

        expect(obj.prop('something new')).to.equal(obj);
      });
    });

    describe('with a default value', function () {
      it('is not default if truthy', function () {
        var prop = util.property().withDefault('default');
        prop('not default');

        expect(prop()).to.equal('not default');
      });

      it('is default if false', function () {
        var prop = util.property().withDefault('default for `false`');
        prop(false);

        expect(prop()).to.equal('default for `false`');
      });

      it('is default if null', function () {
        var prop = util.property().withDefault('default for `null`');
        prop(null);

        expect(prop()).to.equal('default for `null`');
      });

      it('is default if undefined', function () {
        var prop = util.property().withDefault('default for `undefined`');
        prop(undefined);

        expect(prop()).to.equal('default for `undefined`');
      });

      it('still returns the object when setting', function () {
        var obj = {
          prop: util.property().withDefault('whatever')
        };

        expect(obj.prop('something else')).to.equal(obj);
      });
    });
  });
});
