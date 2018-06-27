'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  CFA_ID:'"110000"',
  // SERVER_URL: '"http://121.43.104.142:3006"',
  SERVER_URL: '"http://139.196.84.58:20092"',
  UPLOAD_FILE_URL:'"http://127.0.0.1:3006/api/v1/tool/upload/file"',
})
