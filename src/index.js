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
const SUPPRESS = false;

// Meant to be used within development to logging on or off.
const VERBOSE = true;

const SAY = ['%c --> ', 'background: yellow; color: black'];
const IMPOSSIBLE = ['%c IMPOSSIBLE ', 'background: red; color: white'];
const METHODS = ['say', 'error', 'impossible', 'notImplemented', 'deprecated'];

// The logger.
export default name => {
  name = name ? name+' ::' : '';
  const log = makeLogger('log', name);
  METHODS.forEach(method => log[method] = makeLogger(method, name));
  return log;
};

const makeLogger = (method, name) => (...a) => {
  if (SUPPRESS || !VERBOSE) return a[0];
  switch (method) {
    case 'say':
      return console.log(...SAY, name, ...a) || a[0];
    case 'error':
      return console.error(name, ...a) || a[0];
    case 'impossible':
      return console.error(...IMPOSSIBLE, name, ...a) || a[0];
    case 'notImplemented':
      return console.warn(name, '[Not Implemented]', ...a) || a[0];
    case 'deprecated':
      return console.warn(name, '[Deprecated]', ...a) || a[0];
    default:
      return console.log(name, ...a) || a[0];
  }
};
