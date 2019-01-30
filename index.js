const fero = require('fero')
    , log = require('utilise/log')('[fero-resource-starter]')
    , subscribe = require('@3liv/fero-resource-subscriber')

module.exports = (dir = __dirname) => 
  async ({ name, path }) => 
    await fero(name, async req =>
      req.value.type == 'SUBSCRIBE' ? subscribe(req, path, dir)
                        : [405, 'method not allowed'])
