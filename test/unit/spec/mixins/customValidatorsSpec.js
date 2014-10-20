define(['Squire'], function (Squire) {
  'use strict';

  describe('customValidators', function () {

    var injector = new Squire(),
      customValidators,
      moment,
      _,
      value,
      attr,
      otherAttr,
//      expected,
      model,
      result;

    var moduleLoaded = function () {
      return !!customValidators;
    };

    var resetModule = function () {
      customValidators = undefined;
    };

    beforeEach(function () {
//      this.addMatchers({
//        toBeNaN: function (actual) {
//          return isNaN(actual);
//        }
//      });
      model = {
        get: function (attrName) {
          return this[attrName];
        }
      };

      injector
        .require([
          'underscore',
          'moment',
          'customValidators'
        ], function (underscoreModule, momentModule, module) {
          _ = underscoreModule;
          moment = momentModule;
          customValidators = module;
        });
      waitsFor(moduleLoaded);
    });

    afterEach(resetModule);

    xdescribe('isBoolean method', function () {
      it('should return a Date created by calling the Date constructor with the passed in string', function () {
      });
    });

    describe('gtAttr method', function () {

      beforeEach(function () {
        attr = 'foo';
        otherAttr = 'bar';
      });

      it('should return nothing if the passed in value is greater than the value of the named attribute', function () {
        value = 5;
        model[otherAttr] = 4;
        result = customValidators.gtAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the named attribute does not exist', function () {
        value = 5;
        delete model[otherAttr];
        result = customValidators.gtAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is LTE the value of the named attribute', function () {
        value = 5;
        model[otherAttr] = 5;
        result = customValidators.gtAttr(value, attr, otherAttr, model);
        expect(result).toBeString();
        value = -1;
        model[otherAttr] = 0;
        result = customValidators.gtAttr(value, attr, otherAttr, model);
        expect(result).toBeString();
      });
    });

  });
});