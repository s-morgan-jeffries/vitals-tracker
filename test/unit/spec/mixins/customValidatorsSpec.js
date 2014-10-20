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
      expected,
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

    describe('isBoolean method', function () {
      it('should return nothing if the passed in value is undefined', function () {
        value = undefined;
        expected = true;
        result = customValidators.isBoolean(value, attr, expected);
        expect(result).toBeUndefined();
        expected = false;
        result = customValidators.isBoolean(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is a boolean and a boolean is expected', function () {
        value = true;
        expected = true;
        result = customValidators.isBoolean(value, attr, expected);
        expect(result).toBeUndefined();
        value = false;
        result = customValidators.isBoolean(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is a non-boolean and a boolean is expected', function () {
        value = 5;
        expected = true;
        result = customValidators.isBoolean(value, attr, expected);
        expect(result).toBeString();
      });

      it('should return nothing if the passed in value is a non-boolean and a non-boolean is expected', function () {
        value = 5;
        expected = false;
        result = customValidators.isBoolean(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is a boolean and a non-boolean is expected', function () {
        value = true;
        expected = false;
        result = customValidators.isBoolean(value, attr, expected);
        expect(result).toBeString();
        value = false;
        result = customValidators.isBoolean(value, attr, expected);
        expect(result).toBeString();
      });
    });

    describe('isDate method', function () {
      it('should return nothing if the passed in value is undefined', function () {
        value = undefined;
        expected = true;
        result = customValidators.isDate(value, attr, expected);
        expect(result).toBeUndefined();
        expected = false;
        result = customValidators.isDate(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is a Date or moment and a Date is expected', function () {
        value = new Date();
        expected = true;
        result = customValidators.isDate(value, attr, expected);
        expect(result).toBeUndefined();
        value = moment();
        result = customValidators.isDate(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is not a Date or moment and a Date is expected', function () {
        value = 5;
        expected = true;
        result = customValidators.isDate(value, attr, expected);
        expect(result).toBeString();
      });

      it('should return nothing if the passed in value is a non-Date (or moment) and a non-Date is expected', function () {
        value = 5;
        expected = false;
        result = customValidators.isDate(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is a Date or moment and a non-Date is expected', function () {
        value = new Date();
        expected = false;
        result = customValidators.isDate(value, attr, expected);
        expect(result).toBeString();
        value = moment();
        result = customValidators.isDate(value, attr, expected);
        expect(result).toBeString();
      });
    });

    describe('isNaN method', function () {
      it('should return nothing if the passed in value is undefined', function () {
        value = undefined;
        expected = true;
        result = customValidators.isNaN(value, attr, expected);
        expect(result).toBeUndefined();
        expected = false;
        result = customValidators.isNaN(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is NaN and NaN is expected', function () {
        value = NaN;
        expected = true;
        result = customValidators.isNaN(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is not NaN and NaN is expected', function () {
        value = 5;
        expected = true;
        result = customValidators.isNaN(value, attr, expected);
        expect(result).toBeString();
      });

      it('should return nothing if the passed in value is not NaN and not NaN is expected', function () {
        value = 5;
        expected = false;
        result = customValidators.isNaN(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is NaN and not NaN is expected', function () {
        value = NaN;
        expected = false;
        result = customValidators.isNaN(value, attr, expected);
        expect(result).toBeString();
      });
    });

    describe('isNull method', function () {
      it('should return nothing if the passed in value is undefined', function () {
        value = undefined;
        expected = true;
        result = customValidators.isNull(value, attr, expected);
        expect(result).toBeUndefined();
        expected = false;
        result = customValidators.isNull(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is null and null is expected', function () {
        value = null;
        expected = true;
        result = customValidators.isNull(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is not null and null is expected', function () {
        value = 5;
        expected = true;
        result = customValidators.isNull(value, attr, expected);
        expect(result).toBeString();
      });

      it('should return nothing if the passed in value is not null and not null is expected', function () {
        value = 5;
        expected = false;
        result = customValidators.isNull(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is null and not null is expected', function () {
        value = null;
        expected = false;
        result = customValidators.isNull(value, attr, expected);
        expect(result).toBeString();
      });
    });

    describe('isNumber method', function () {
      it('should return nothing if the passed in value is undefined', function () {
        value = undefined;
        expected = true;
        result = customValidators.isNumber(value, attr, expected);
        expect(result).toBeUndefined();
        expected = false;
        result = customValidators.isNumber(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is a number and a number is expected', function () {
        value = 5;
        expected = true;
        result = customValidators.isNumber(value, attr, expected);
        expect(result).toBeUndefined();
        value = NaN;
        result = customValidators.isNumber(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is not a number and a number is expected', function () {
        value = 'not a number';
        expected = true;
        result = customValidators.isNumber(value, attr, expected);
        expect(result).toBeString();
      });

      it('should return nothing if the passed in value is not a number and a non-number is expected', function () {
        value = 'not a number';
        expected = false;
        result = customValidators.isNumber(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is a number and a non-number is expected', function () {
        value = 5;
        expected = false;
        result = customValidators.isNumber(value, attr, expected);
        expect(result).toBeString();
        value = NaN;
        result = customValidators.isNumber(value, attr, expected);
        expect(result).toBeString();
      });
    });

    describe('isString method', function () {
      it('should return nothing if the passed in value is undefined', function () {
        value = undefined;
        expected = true;
        result = customValidators.isString(value, attr, expected);
        expect(result).toBeUndefined();
        expected = false;
        result = customValidators.isString(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is a string and a string is expected', function () {
        value = 'a string';
        expected = true;
        result = customValidators.isString(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is not a string and a string is expected', function () {
        value = 0;
        expected = true;
        result = customValidators.isString(value, attr, expected);
        expect(result).toBeString();
      });

      it('should return nothing if the passed in value is not a string and a non-string is expected', function () {
        value = 0;
        expected = false;
        result = customValidators.isString(value, attr, expected);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is a string and a non-string is expected', function () {
        value = 'a string';
        expected = false;
        result = customValidators.isString(value, attr, expected);
        expect(result).toBeString();
      });
    });

    // NB: These methods currently does not care about the types of the value or the otherAttr
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

      it('should return nothing if the value is undefined', function () {
        value = undefined;
        model[otherAttr] = 5;
        result = customValidators.gtAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the named attribute does not exist', function () {
        value = 5;
        delete model[otherAttr];
        result = customValidators.gtAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });
    });

    describe('gteAttr method', function () {

      beforeEach(function () {
        attr = 'foo';
        otherAttr = 'bar';
      });

      it('should return nothing if the value is undefined', function () {
        value = undefined;
        model[otherAttr] = 5;
        result = customValidators.gteAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the named attribute is undefined', function () {
        value = 5;
        delete model[otherAttr];
        result = customValidators.gteAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is greater than or equal to the value of the named attribute', function () {
        value = 4;
        model[otherAttr] = 4;
        result = customValidators.gteAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
        value = 5;
        result = customValidators.gteAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is LT the value of the named attribute', function () {
        value = 4;
        model[otherAttr] = 5;
        result = customValidators.gteAttr(value, attr, otherAttr, model);
        expect(result).toBeString();
      });
    });

    describe('ltAttr method', function () {

      beforeEach(function () {
        attr = 'foo';
        otherAttr = 'bar';
      });

      it('should return nothing if the value is undefined', function () {
        value = undefined;
        model[otherAttr] = 5;
        result = customValidators.ltAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the named attribute does not exist', function () {
        value = 5;
        delete model[otherAttr];
        result = customValidators.ltAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is less than the value of the named attribute', function () {
        value = 4;
        model[otherAttr] = 5;
        result = customValidators.ltAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is GTE the value of the named attribute', function () {
        value = 5;
        model[otherAttr] = 5;
        result = customValidators.ltAttr(value, attr, otherAttr, model);
        expect(result).toBeString();
        value = 6;
        result = customValidators.ltAttr(value, attr, otherAttr, model);
        expect(result).toBeString();
      });
    });

    describe('lteAttr method', function () {

      beforeEach(function () {
        attr = 'foo';
        otherAttr = 'bar';
      });

      it('should return nothing if the value is undefined', function () {
        value = undefined;
        model[otherAttr] = 5;
        result = customValidators.lteAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the named attribute does not exist', function () {
        value = 5;
        delete model[otherAttr];
        result = customValidators.lteAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return nothing if the passed in value is less than or equal to the value of the named attribute', function () {
        value = 4;
        model[otherAttr] = 5;
        result = customValidators.lteAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
        value = 5;
        result = customValidators.lteAttr(value, attr, otherAttr, model);
        expect(result).toBeUndefined();
      });

      it('should return an error message if the passed in value is GT the value of the named attribute', function () {
        value = 6;
        model[otherAttr] = 5;
        result = customValidators.lteAttr(value, attr, otherAttr, model);
        expect(result).toBeString();
      });
    });

  });
});