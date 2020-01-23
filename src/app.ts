import Koa from 'koa'
const app = new Koa()
import views from 'koa-views'
import json from 'koa-json'
import onError from 'koa-onerror'
import bodyparser from 'koa-bodyparser'
import logger from 'koa-logger'

import './db/seq'

import userApiRouter from './routes/api/user'
import index from './routes/index'
import userViewRouter from './routes/view/user'
import error from './routes/view/error'
import env from './utils/env'

interface ErrorOption {
  redirect?: string
}

// error handler option
let errorOption:ErrorOption = {}

if (env.isProd) {
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
app.use(require('koa-static')(`${__dirname}/public`))

app.use(views(`${__dirname}/views`, {
  extension: 'ejs'
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
app.use(index.routes()).use(index.allowedMethods())
app.use(userViewRouter.routes()).use(userViewRouter.allowedMethods())
app.use(error.routes()).use(error.allowedMethods())

// error-handling
app.on('error', (err: any, ctx: Koa.BaseContext) => {
  // eslint-disable-next-line no-console
  console.error('server error', err, ctx)
})

module.exports = app
