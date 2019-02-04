const fero = require('fero')
    , { memoize } = require('async-decorators')
    , log = require('utilise/log')('[fero-resource-starter]')
    , subscribe = memoize(require('@3liv/fero-resource-subscriber'))

module.exports = (dir = __dirname, wp = false) => 
  async ({ name, path, body = '', headers = '' }) => {
    
    //warm up to prevent cold start
    subscribe(dir, { name, path, body, headers }, { wp })

    await fero(name, async req =>
      req.value.type == 'SUBSCRIBE' ? subscribe(dir, { name, path, body, headers}, { wp })
                        : [405, 'method not allowed'])
  }
