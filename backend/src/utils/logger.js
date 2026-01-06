function info(...args) { console.log('[info]', ...args); }
function error(...args) { console.error('[error]', ...args); }
module.exports = { info, error };
