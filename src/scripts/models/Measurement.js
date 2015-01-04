define([
  'models/LoopBackModel',
  'presenters/Measurement'
], function (LoopBackModel, MeasurementPresenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.stale = ['isEditing'];

  protoProps.presenter = MeasurementPresenter;

  protoProps.defaults = {
    isEditing: false
  };

  protoProps.parse = function (response, options) {
    //console.log(arguments);
    //console.log(response);
    //console.log(options);
    if (options.parse === true) {
      response.measuredAt = new Date(response.measuredAt);
    }
    return response;
  };

  // t0d0: Write validation functions (mixin)
  protoProps.validate = function (attr) {
    //attr =
    //console.log(attr);
    attr = attr || {};
    var errors = {},
      hasErrors = false,
      measuredAt = attr.measuredAt,
      //temperature = attr.temperature,
      pulse = attr.pulse,
      sbp = attr.sbp,
      dbp = attr.dbp,
      respirations = attr.respirations,
      saturation = attr.saturation;

    var addError = function (attrName, err) {
      hasErrors = true;
      errors[attrName] = errors[attrName] || [];
      errors[attrName].push(err);
    };

    // measuredAt
    if (measuredAt) {
      var now = new Date();
      if (!(measuredAt instanceof Date)) {
        addError('measuredAt', 'measuredAt must be a date');
      }
      if (measuredAt > now) {
        addError('measuredAt', 'measuredAt must not be in the future');
      }
    }

    // temperature

    // pulse
    if (pulse) {
      if (pulse < 0) {
        addError('pulse', 'pulse cannot be less than zero');
      }
    }

    // sbp
    if (sbp) {
      if (sbp < 0) {
        addError('sbp', 'sbp cannot be less than zero');
      }
      if (dbp && sbp < dbp) {
        addError('sbp', 'sbp cannot be less than dbp');
      }
    }

    // dbp
    if (dbp) {
      if (dbp < 0) {
        addError('dbp', 'dbp cannot be less than zero');
      }
    }

    // respirations
    if (respirations) {
      if (respirations < 0) {
        addError('respirations', 'respirations cannot be less than zero');
      }
    }

    // saturation
    if (saturation) {
      if (saturation < 0) {
        addError('saturation', 'saturation cannot be less than zero');
      } else if (saturation > 100) {
        addError('saturation', 'saturation cannot be greater than 100');
      }
    }

    if (hasErrors) {
      return errors;
    }
  };

  return LoopBackModel.extend(protoProps, staticProps);
});
