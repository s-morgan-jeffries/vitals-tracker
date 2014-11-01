define(['Squire', 'customMatchers'], function (Squire, customMatchers) {
  'use strict';

  // Okay, so the way this is written, it tests atomic properties of the module. That part is good. The bad part is that
  // it doesn't map cleanly to features that you'd want to add or to the interface of an actual model instance. I sort
  // of want to leave it this way for now, just because I don't know how this will go, but I'm also not sure if this is
  // the most useful test suite.
  // Anyway, you'll probably need to write integration tests eventually.
  xdescribe('Measurement', function () {

    var Measurement;

    var moduleLoaded = function () {
      return !!Measurement;
    };

    var resetModule = function () {
      Measurement = undefined;
    };

    // Mocks
    var mockUnderscore,
      mockBackbone,
      mockMoment;

    beforeEach(function () {
      // Add custom matchers
      this.addMatchers(customMatchers);

      // Mocks
      // Underscore
      mockUnderscore = {};
      // Backbone
      mockBackbone = {
        Model: {
          extend: function (instanceProps, staticProps) {
            return {
              instanceProps: instanceProps,
              staticProps: staticProps
            };
          }
        },
        LocalStorage: function () {}
      };
      sinon.spy(mockBackbone.Model, 'extend');
      // Moment
      mockMoment = sinon.stub();

      // You have to create a new injector between each test. Otherwise, you're using the same injector over and over,
      // and Squire will cache your module. If you regenerate mock dependencies between each test, they won't get
      // injected, because the module you're testing is only required once per injector instance.
      var injector = new Squire();
      injector
        .mock('underscore', mockUnderscore)
        .mock('backbone', mockBackbone)
        .mock('moment', mockMoment)
        .require(['Measurement'], function (module) {
          Measurement = module;
        });
      waitsFor(moduleLoaded);
    });

    afterEach(resetModule);

    it('should extend Backbone.Model', function () {
      expect(mockBackbone.Model.extend).toHaveBeenCalledOnce();
    });

    // I have to be honest, I don't know what this particular suite accomplishes.
    describe('validation instance property', function () {
      var expectedValidationObj = {
        createdAt: {
          required: true,
          isValidDate: true
        },
        measuredAt: {
          required: true,
          isValidDate: true,
          lteAttr: 'updatedAt'
        },
        updatedAt: {
          required: true,
          isValidDate: true
        },
        temperature: {
          isNumber: true,
          isNaN: false,
          required: false
        },
        pulse: {
          min: 0,
          isNumber: true,
          isNaN: false,
          required: false
        },
        sbp: {
          gtAttr: 'dbp',
          isNumber: true,
          isNaN: false,
          required: false
        },
        dbp: {
          ltAttr: 'sbp',
          isNumber: true,
          isNaN: false,
          required: false
        },
        respirations: {
          min: 0,
          isNumber: true,
          isNaN: false,
          required: false
        },
        saturation: {
          range: [0, 100],
          isNumber: true,
          isNaN: false,
          required: false
        }
      };
      var validationProp;

      beforeEach(function () {
        validationProp = Measurement.instanceProps.validation;
      });

      it('should match the expected validation object', function () {
        expect(validationProp).toEqual(expectedValidationObj);
      });
    });

    describe('defaults instance property', function () {
      var defaultsProp,
        defaults,
        now;

      beforeEach(function () {
        now = (new Date()).toISOString();
        mockMoment.returns(now);
        defaultsProp = Measurement.instanceProps.defaults;
      });

      it('should be a function with no arguments that returns an object', function () {
        expect(defaultsProp).toBeFunction();
        expect(defaultsProp.length).toEqual(0);
        defaults = defaultsProp();
        expect(defaults).toBeObject();
      });

      it('should, when called, create a moment object representing the current time', function () {
        defaults = defaultsProp();
        expect(mockMoment).toHaveBeenCalledOnce();
        // Called with no arguments
        expect(mockMoment).toHaveBeenCalledWithExactly();
      });

      describe('defaults object', function () {

        beforeEach(function () {
          defaults = defaultsProp();
        });

        it('should have a createdAt property set to the current time', function () {
          expect(defaults.createdAt).toEqual(now);
        });

        it('should have a measuredAt property set to the current time', function () {
          expect(defaults.measuredAt).toEqual(now);
        });

        it('should have an updatedAt property set to the current time', function () {
          expect(defaults.updatedAt).toEqual(now);
        });
      });
    });

    describe('parse instance property', function () {
      var parseProp,
        responseObj,
        createdAt,
        momentizedCreatedAt,
        updatedAt,
        momentizedUpdatedAt,
        measuredAt,
        momentizedMeasuredAt;

      beforeEach(function () {
        parseProp = Measurement.instanceProps.parse;
        createdAt = new Date();
        momentizedCreatedAt = {
          _date: createdAt
        };
        updatedAt = new Date();
        momentizedUpdatedAt = {
          _date: updatedAt
        };
        measuredAt = new Date();
        momentizedMeasuredAt = {
          _date: measuredAt
        };
        responseObj = {
          temperature: 99,
          sbp: 120,
          dbp: 80
        };
      });

      it('should be a function', function () {
        expect(parseProp).toBeFunction();
      });

      it('should create a moment object from the createdAt property of the response object', function () {
        responseObj.createdAt = createdAt;
        mockMoment.withArgs(createdAt).returns(momentizedCreatedAt);

        responseObj = parseProp(responseObj);

        expect(mockMoment).toHaveBeenCalledWithExactly(createdAt);
        expect(responseObj.createdAt).toBe(momentizedCreatedAt);
      });

      it('should create a moment object from the updatedAt property of the response object', function () {
        responseObj.updatedAt = updatedAt;
        mockMoment.withArgs(updatedAt).returns(momentizedUpdatedAt);

        responseObj = parseProp(responseObj);

        expect(mockMoment).toHaveBeenCalledWithExactly(updatedAt);
        expect(responseObj.updatedAt).toBe(momentizedUpdatedAt);
      });

      it('should create a moment object from the measuredAt property of the response object', function () {
        responseObj.measuredAt = measuredAt;
        mockMoment.withArgs(measuredAt).returns(momentizedMeasuredAt);

        responseObj = parseProp(responseObj);

        expect(mockMoment).toHaveBeenCalledWithExactly(measuredAt);
        expect(responseObj.measuredAt).toBe(momentizedMeasuredAt);
      });
    });
  });
});
