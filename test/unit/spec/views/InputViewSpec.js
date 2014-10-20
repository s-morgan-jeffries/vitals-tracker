define(['Squire'], function (Squire) {
  'use strict';

  xdescribe('InputView', function () {

    var injector = new Squire(),
      InputView;

    var moduleLoaded = function () {
      return !!InputView;
    };

    var resetModule = function () {
      InputView = undefined;
    };

    // Mocks
    var mockUnderscore = {};

    // Rather than mocking everything in Backbone, you could just set Backbone up with spies...
    var mockBackbone = {
      View: {
        extend: function () {}
      }
    };

    beforeEach(function () {
      injector
        .mock('underscore', mockUnderscore)
        .mock('backbone', mockBackbone)
        .require(['InputView'], function (module) {
          InputView = module;
        });
      waitsFor(moduleLoaded);
    });

    afterEach(resetModule);

    it('should extend Backbone.View', function () {

    });

    describe('start method', function () {
      it('should return the message', function () {
        var msg = InputView.start();
        expect(msg).toEqual('Hello, Motherfucker!');
      });
    });
  });
});