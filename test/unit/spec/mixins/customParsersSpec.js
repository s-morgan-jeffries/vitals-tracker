define(['Squire'], function (Squire) {
  'use strict';

  describe('customParsers', function () {

    var injector = new Squire(),
      customParsers;

    var moduleLoaded = function () {
      return !!customParsers;
    };

    var resetModule = function () {
      customParsers = undefined;
    };

    // Mocks
    var mockMoment = {};

    beforeEach(function () {
//      console.log(this.addMatchers);
      this.addMatchers({
        toBeNaN: function (actual) {
          return isNaN(actual);
        }
      });
      injector
        .mock('moment', mockMoment)
        .require(['customParsers'], function (module) {
          customParsers = module;
        });
      waitsFor(moduleLoaded);
    });

    afterEach(resetModule);

    describe('parseDatetimeInput method', function () {
      var valueStr,
        parsedValue;

      it('should return a Date created by calling the Date constructor with the passed in string', function () {
        var date;
        valueStr = '2014-10-19';
        date = new Date(valueStr);
        parsedValue = customParsers.parseDatetimeInput(valueStr);
        expect(parsedValue).toBeDate();
        expect(parsedValue).toEqual(date);
      });
    });

    describe('parseNumberInput method', function () {
      var valueStr,
        validity,
        parsedValue;

      beforeEach(function () {
        validity = {};
      });

      it('should return NaN when validity.badInput is set to true', function () {
        valueStr = '';
        validity.badInput = true;
        parsedValue = customParsers.parseNumberInput(valueStr, validity);
        expect(parsedValue).toBeNaN();
      });

      it('should return NaN when the passed in string cannot be converted to a valid number', function () {
        valueStr = 'not a number';
        parsedValue = customParsers.parseNumberInput(valueStr, validity);
        expect(parsedValue).toBeNaN();
      });

      it('should return undefined when passed an empty string', function () {
        valueStr = '';
        parsedValue = customParsers.parseNumberInput(valueStr, validity);
        expect(parsedValue).toBeUndefined();
      });

      it('should return the numerical representation of any string that can be coerced to a number', function () {
        valueStr = '99';
        var valueNum = +valueStr;
        parsedValue = customParsers.parseNumberInput(valueStr, validity);
        expect(parsedValue).toBeNumber();
        expect(parsedValue).toEqual(valueNum);
      });
    });

    describe('parseTextInput method', function () {
      var valueStr,
        parsedValue;

      it('should return the passed in string unchanged', function () {
        valueStr = 'a string';
        parsedValue = customParsers.parseTextInput(valueStr);
        expect(parsedValue).toEqual(valueStr);
      });
    });
  });
});