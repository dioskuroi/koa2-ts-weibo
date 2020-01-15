import * as path from 'path'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import User from './model/model'
const conf: SequelizeOptions = {
  host: 'localhost',
  dialect: 'mysql',
  models: [User]
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'paramore123', conf)
seq.sync({ force: true }).then(() => {
  console.log('sync ok')
}).catch(() => {
  console.log('sync error')
})
