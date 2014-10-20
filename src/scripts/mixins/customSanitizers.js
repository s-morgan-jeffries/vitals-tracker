define([], function () {
  var customSanitizers = {};

  // Maybe call these parsers?
  // The whole point of these is that they should return the value using a semantic JavaScript representation. In fact,
  // you might rename this thing (yes, again) so that that's clear. The only reason not to do that is that you don't
  // necessarily abstract out another module for doing the actual sanitizing.

  // t0d0: Figure out a way to avoid processing these
//  customSanitizers.sanitizeButton = function () {};
//  customSanitizers.sanitizeHidden = function () {};
  customSanitizers.sanitizeImage = function () {};
  customSanitizers.sanitizeRadio = function () {};
  customSanitizers.sanitizeReset = function () {};
  customSanitizers.sanitizeSubmit = function () {};

  customSanitizers.sanitizeCheckbox = function () {};

  // Date and time types
  // Should return a date. If the valueStr isn't a valid date representation, it should return an Invalid Date. It's up
  // to the model to decide what it can accept.
  // Just the date with no timezone
  customSanitizers.sanitizeDate = function (valueStr, validity) {
    // If there's a validity object and this is a badInput
    if (validity && validity.badInput) {
      return new Date(NaN);
    }
    var date = new Date(valueStr);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  };
  // Datetime
  customSanitizers.sanitizeDatetime = function (valueStr) {
    return new Date(valueStr);
  };
  customSanitizers.sanitizeDatetimeLocal = function (valueStr, validity) {

  };
  customSanitizers.sanitizeMonth = function (valueStr, validity) {
    // If there's a validity object and this is a badInput
    if (validity && validity.badInput) {
      return new Date(NaN);
    }
    var date = new Date(valueStr);
    date.setUTCHours(0, 0, 0, 0);
    date.setUTCDate(0);
    return date;
  };
  customSanitizers.sanitizeTime = function () {};

  customSanitizers.sanitizeWeek = function () {};

  // t0d0: Figure out if there's anything to do with these
  customSanitizers.sanitizeColor = function () {};
  customSanitizers.sanitizeFile = function () {};

  customSanitizers.sanitizeEmail = function () {};

  // Will return undefined for an empty string, NaN for a string that can't be converted to a number, and a number
  // otherwise. At least in Chrome, this
  customSanitizers.sanitizeNumber = function (valueStr, validity) {
    // If there's a validity object and this is a badInput
    if (validity && validity.badInput) {
      return NaN;
    }
    return valueStr.length ? +valueStr : void 0;
  };
//  console.log('FIGURE OUT HOW YOU WANT TO HANDLE HTML5 FORM VALIDATION');
  // Because of HTML5 form validation, the method above won't pass an invalid value to the model validator. If you type
  // a non-numerical string into an input with a type of `number`, input.value will evaluate to an empty string. I
  // could probably use the validation plugin to solve this, but I don't feel like learning yet another non-standard
  // API. Now is as good a time as any to learn about the Constraint Validation API.
  // You should probably use progressive enhancement here, as opposed to just ignoring or bypassing browser validation.

  customSanitizers.sanitizePassword = function () {};
  customSanitizers.sanitizeRange = function () {};
  customSanitizers.sanitizeSearch = function (valueStr, validity) {};
  customSanitizers.sanitizeTel = function (valueStr, validity) {};

  customSanitizers.sanitizeText = function (str) {
    return str;
  };

  customSanitizers.sanitizeUrl = function () {};

  return customSanitizers;
});