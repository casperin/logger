// This will kill all console logging. It would make make sense to change this
// to something like `const SUPPRESS = env.prod`.
const SUPPRESS = false;

// Meant to be used within development to logging on or off.
const VERBOSE = true;

const SAY = ['%c --> ', 'background: yellow; color: black'];
const IMPOSSIBLE = ['%c IMPOSSIBLE ', 'background: red; color: white'];
const METHODS = ['error', 'impossible', 'notImplemented', 'deprecated', 'say'];

const logger = (name) => {
  name = name ? name+' ::' : '';
  const log = makeLogger('log', name);
  METHODS.forEach(type => log[type] = makeLogger(type, name));
  return log;
};

const makeLogger = (type, name) => (...a) => {
  if (SUPPRESS || !VERBOSE) return a[0];
  switch (type) {
    case 'error':
      return console.error(name, ...a) || a[0];
    case 'impossible':
      return console.error(...IMPOSSIBLE, name, ...a) || a[0];
    case 'notImplemented':
      return console.warn(name, '[Not Implemented]', ...a) || a[0];
    case 'deprecated':
      return console.warn(name, '[Deprecated]', ...a) || a[0];
    case 'say':
      return console.log(...SAY, name, ...a) || a[0];
    default:
      return console.log(name, ...a) || a[0];
  }
};
