const fero = require('fero')
    , pCache = require('p-cache')({
        label: 'fero-service-cache',
        // pass args to lru-cache here
        max: 1000
      })
    , log = require('utilise/log')('[fero-resource-starter]')
    , subscribe = pCache(require('@3liv/fero-resource-subscriber'))

module.exports = (dir = __dirname, wp = false) => 
  async ({ name, path, body = '', headers = '' }) => {
    
    //warm up to prevent cold start
    log(`Warming up ${name}`)
    await subscribe(dir, { name, path, body, headers }, { wp })

    await fero(name, async req =>
      req.value.type == 'SUBSCRIBE' ? subscribe(dir, { name, path, body, headers}, { wp })
                        : [405, 'method not allowed'])
  }
