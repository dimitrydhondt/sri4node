const pMap = require('p-map'); 

const { errorAsCode, debug, SriError, stringifyError, setServerTimingHdr } = require('./common.js')

exports = module.exports = {

  applyHooks: async (type, functions, applyFun, sriRequest) => {
    if (functions && functions.length > 0) {
      const startTime = Date.now();
      try {
        debug('hooks', `applyHooks-${type}: going to apply ${functions.length} functions`);
        await pMap(functions, applyFun, {concurrency: 1})
        const duration = Date.now() - startTime;
        debug('hooks', `applyHooks-${type}: all functions resolved (took ${duration}ms).`);
        if (sriRequest) {
            setServerTimingHdr(sriRequest, `${type}`.replace(' ', '_'), duration);
        };
      } catch(err) {
        const duration = Date.now() - startTime;
        debug('hooks', `applyHooks-${type}: function failed (took ${duration}ms).`);
        if (sriRequest) {
            setServerTimingHdr(sriRequest, `${type}`.replace(' ', '_'), duration);
        };
        if (err instanceof SriError) {
          throw err
        } else {
          console.log('_______________________ H O O K S - E R R O R _____________________________________________') 
          console.log(err)
          console.log(err.stack)
          console.log(Object.prototype.toString.call(err))
          console.log('___________________________________________________________________________________________')
          throw new SriError({status: 500, errors: [{code: errorAsCode(`${type} failed`), msg: stringifyError(err)}] })
        }
      }
    } else {
      debug('hooks', `applyHooks-${type}: no ${type} functions registered.`);
    }
    return
  }

}