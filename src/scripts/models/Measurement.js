define([
  'models/LoopBackModel',
  'presenters/Measurement'
], function (LoopBackModel, MeasurementPresenter) {
  'use strict';

  var protoProps = {},
    staticProps = {};

  protoProps.stale = ['isEditing'];

  protoProps.presenter = MeasurementPresenter;

  //protoProps.defaults = {
  //  isEditing: false
  //};

  protoProps.defaults = function () {
    return {
      isEditing: false
      //,
      //measuredAt: null,
      //temperature: null,
      //pulse: null,
      //sbp: null,
      //dbp: null,
      //respirations: null,
      //saturation: null
    };
  };

  //
  protoProps.parse = function (response, options) {
    if (options.parse === true) {
      response.measuredAt = new Date(response.measuredAt);
    }
    return response;
  };

  // This is in keeping with suggestions from pragmatic-backbone. It's a fairly minimal list of validators. The logic
  // here is that full validation should be taking place on the server. Validating everything here would be slow and
  // redundant. The only validations we want to do here are ones that are going to make the app more convenient. A
  // measurement instance could only be getting values from one of two places: the server and the input form. If the
  // values are from the server, they're already validated (or should be), so we don't need to worry about those. If
  // they're coming from the form, they'll be of the right type, but they might not be in the correct range.
  protoProps.validate = function (attr) {
    attr = attr || {};
    var errors = {},
      hasErrors = false,
      measuredAt = attr.measuredAt,
      temperature = attr.temperature,
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
    if (measuredAt !== void 0) {
      var now = new Date();
      if (isNaN(measuredAt.valueOf())) {
        addError('measuredAt', 'measuredAt must be a valid date');
      }
      if (measuredAt > now) {
        addError('measuredAt', 'measuredAt cannot be in the future');
      }
    }

    // temperature
    if (temperature !== void 0) {
      if (isNaN(temperature)) {
        addError('temperature', 'temperature must be a number');
      }
    }

    // pulse
    if (pulse !== void 0) {
      if (isNaN(pulse)) {
        addError('pulse', 'pulse must be a number');
      }
      if (pulse < 0) {
        addError('pulse', 'pulse cannot be less than zero');
      }
    }

    // sbp
    if (sbp !== void 0) {
      if (isNaN(sbp)) {
        addError('sbp', 'sbp must be a number');
      }
      if (sbp < 0) {
        addError('sbp', 'sbp cannot be less than zero');
      }
      if (dbp && sbp < dbp) {
        addError('sbp', 'sbp cannot be less than dbp');
      }
    }

    // dbp
    if (dbp !== void 0) {
      if (isNaN(dbp)) {
        addError('dbp', 'dbp must be a number');
      }
      if (dbp < 0) {
        addError('dbp', 'dbp cannot be less than zero');
      }
    }

    // respirations
    if (respirations !== void 0) {
      if (isNaN(respirations)) {
        addError('respirations', 'respirations must be a number');
      }
      if (respirations < 0) {
        addError('respirations', 'respirations cannot be less than zero');
      }
    }

    // saturation
    if (saturation !== void 0) {
      if (isNaN(saturation)) {
        addError('saturation', 'saturation must be a number');
      }
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
