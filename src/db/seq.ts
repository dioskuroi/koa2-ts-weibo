import { Sequelize } from 'sequelize-typescript'
import { MYSQL_CONF } from '../config/db'
// import User from './model/model'


const seq = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.user, MYSQL_CONF.password, MYSQL_CONF.conf)

export default seq
