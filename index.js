// Set this to true, and everything will be logged.
const VERBOSE = false;
// ... unless this one is set. This beats all. Suppress should probably be
// hooked up to your env variable if you have one.
const SUPPRESS = false;

const MARK = ['%c → ', 'background: yellow; color: black'];
const NOT_IMPL = 'Not Implemented ::';
const TAP = 'TAP ::';
const NO_NAME = Error('You need to provide a name to `logger`');

// When logs are silenced, we return this object instead of a real log.
const noop = () => {};
const noopLog = noop;
noopLog.warn = noopLog.error = noopLog.notImplemented = noopLog.mark = noop;
noopLog.tap = x => x;

export default (name, silent = false) => {
  if (SUPPRESS)           return noopLog;
  if (!VERBOSE && silent) return noopLog;
  if (!name) throw NO_NAME;

  const caller_line = (new Error).stack.split("\n")[4]

  console.log('line:', (new Error).stack);

  const prefix = '[['+name+']]';

  const log           = (...args) => console.log(prefix, ...args);
  log.warn            = (...args) => console.warn(prefix, ...args);
  log.error           = (...args) => console.error(prefix, ...args);
  log.notImplemented  = (...args) => console.warn(prefix, NOT_IMPL, ...args);
  log.mark            = (...args) => console.log(...MARK, prefix, ...args);
  log.tap             = x         => console.log(prefix, TAP, x) || x;
  return log;
}

