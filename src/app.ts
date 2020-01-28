import path from 'path'
import Koa from 'koa'
const app = new Koa()
import views from 'koa-views'
import json from 'koa-json'
import onError from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'
import koaStatic from 'koa-static'

import './db/seq'
import { SESSION_SECRET_KEY } from './config/secretKeys'
import { REDIS_CONF } from './config/db'
import session from 'koa-generic-session'
import redisStore from 'koa-redis'

import userApiRouter from './routes/api/user'
import utilsApiRouter from './routes/api/utils'
import userViewRouter from './routes/view/user'
import blogViewRouter from './routes/view/blog'
import error from './routes/view/error'
import ENV from './utils/env'

interface ErrorOption {
  redirect?: string
}

// error handler option
let errorOption:ErrorOption = {}

if (ENV.isProd) {
  errorOption = {
    redirect: '/error'
  }
}

// error handler
onError(app, errorOption)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(koaStatic(`${__dirname}/public`))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))

app.use(views(`${__dirname}/views`, {
  extension: 'ejs'
}))

// session'
app.keys = [SESSION_SECRET_KEY]

app.use(session({
  key: 'weibo.sid',
  prefix: 'weibo.sess',
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: redisStore({
    // all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    host: REDIS_CONF.host,
    port: REDIS_CONF.port
  })
}))
// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(userApiRouter.routes()).use(userApiRouter.allowedMethods())
app.use(utilsApiRouter.routes()).use(utilsApiRouter.allowedMethods())
app.use(userViewRouter.routes()).use(userViewRouter.allowedMethods())
app.use(blogViewRouter.routes()).use(blogViewRouter.allowedMethods())
app.use(error.routes()).use(error.allowedMethods())

// error-handling
app.on('error', (err: any, ctx: Koa.BaseContext) => {
  // eslint-disable-next-line no-console
  console.error('server error', err, ctx)
})

module.exports = app
