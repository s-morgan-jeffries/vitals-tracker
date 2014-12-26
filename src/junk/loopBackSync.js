var userAccessToken,
  loopBackSync;

define([
  'plugins/createLoopBackSync'
], function (createLoopBackSync) {
  'use strict';

  userAccessToken = 'aeqjnbj0nMjqcYND8xASIkqR8YCb0bNnLTpV5FSCC5VM21EkcJKs9kNSnvmpD3Iy';
  loopBackSync = createLoopBackSync();

  return loopBackSync;
});
