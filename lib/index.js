'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * This file is a mini tool intended for use when building small and medium
 * sized applications. It's a starting point for a logger tool that can be
 * configured to meet the needs of both debugging, as well logging real errors
 * in production.
 *
 * For instance, when working on a react/redux application, I will usually
 * leave a `log(action);` at the top of the main reducer function.
 *
 * API:
 *  log();
 *  log.say();
 *  log.error();
 *  log.impossible();
 *  log.notImplemented();
 *  log.deprecated();
 *
 * Example:
 *  // At the top of a file.
 *  const log = logger('Some File/module/whatever');
 *
 *  log('This will be logged, nothing super important');
 *
 *  log.error('Some error');
 *
 *  try {
 *    // Something...
 *  } catch (err) {
 *    log.impossible('The above try should never fail!', err);
 *  }
 *
 *  log.say('I will be highlighted in the logs, so I am easy to find.');
 *  log.say('Do not leave in code that are not actively being developed');
 */

// This will kill all console logging. It would make make sense to change this
// to something like `const SUPPRESS = env.prod`.
var SUPPRESS = false;

// Meant to be used within development to logging on or off.
var VERBOSE = true;

var SAY = ['%c --> ', 'background: yellow; color: black'];
var IMPOSSIBLE = ['%c IMPOSSIBLE ', 'background: red; color: white'];
var METHODS = ['say', 'error', 'impossible', 'notImplemented', 'deprecated'];

// The logger.

exports.default = function (name) {
  name = name ? name + ' ::' : '';
  var log = makeLogger('log', name);
  METHODS.forEach(function (method) {
    return log[method] = makeLogger(method, name);
  });
  return log;
};

var makeLogger = function makeLogger(method, name) {
  return function () {
    var _console, _console2, _console3, _console4, _console5, _console6;

    for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
      a[_key] = arguments[_key];
    }

    if (SUPPRESS || !VERBOSE) return a[0];
    switch (method) {
      case 'say':
        return (_console = console).log.apply(_console, SAY.concat([name], a)) || a[0];
      case 'error':
        return (_console2 = console).error.apply(_console2, [name].concat(a)) || a[0];
      case 'impossible':
        return (_console3 = console).error.apply(_console3, IMPOSSIBLE.concat([name], a)) || a[0];
      case 'notImplemented':
        return (_console4 = console).warn.apply(_console4, [name, '[Not Implemented]'].concat(a)) || a[0];
      case 'deprecated':
        return (_console5 = console).warn.apply(_console5, [name, '[Deprecated]'].concat(a)) || a[0];
      default:
        return (_console6 = console).log.apply(_console6, [name].concat(a)) || a[0];
    }
  };
};
