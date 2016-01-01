'use strict';

// This will kill all console logging. It would make make sense to change this
// to something like `const SUPPRESS = env.prod`.
var SUPPRESS = false;

// Meant to be used within development to logging on or off.
var VERBOSE = true;

var SAY = ['%c --> ', 'background: yellow; color: black'];
var IMPOSSIBLE = ['%c IMPOSSIBLE ', 'background: red; color: white'];
var METHODS = ['error', 'impossible', 'notImplemented', 'deprecated', 'say'];

var logger = function logger(name) {
  name = name ? name + ' ::' : '';
  var log = makeLogger('log', name);
  METHODS.forEach(function (type) {
    return log[type] = makeLogger(type, name);
  });
  return log;
};

var makeLogger = function makeLogger(type, name) {
  return function () {
    var _console, _console2, _console3, _console4, _console5, _console6;

    for (var _len = arguments.length, a = Array(_len), _key = 0; _key < _len; _key++) {
      a[_key] = arguments[_key];
    }

    if (SUPPRESS || !VERBOSE) return a[0];
    switch (type) {
      case 'error':
        return (_console = console).error.apply(_console, [name].concat(a)) || a[0];
      case 'impossible':
        return (_console2 = console).error.apply(_console2, IMPOSSIBLE.concat([name], a)) || a[0];
      case 'notImplemented':
        return (_console3 = console).warn.apply(_console3, [name, '[Not Implemented]'].concat(a)) || a[0];
      case 'deprecated':
        return (_console4 = console).warn.apply(_console4, [name, '[Deprecated]'].concat(a)) || a[0];
      case 'say':
        return (_console5 = console).log.apply(_console5, SAY.concat([name], a)) || a[0];
      default:
        return (_console6 = console).log.apply(_console6, [name].concat(a)) || a[0];
    }
  };
};
