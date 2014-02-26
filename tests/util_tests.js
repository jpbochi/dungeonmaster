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
  });
});
