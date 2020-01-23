/**
 * @description jest server
 */

import request from 'supertest'
import Koa from 'koa'
const server: Koa = require('../src/app')

export default request(server.callback())
