import { Sequelize } from 'sequelize-typescript'
import { MYSQL_CONF } from '../config/db'
import { User, Blog, UserRelation, AtRelation } from './models'

// * 数据模型
MYSQL_CONF.conf.models = [User, Blog, UserRelation, AtRelation]

const seq = new Sequelize(MYSQL_CONF.database, MYSQL_CONF.user, MYSQL_CONF.password, MYSQL_CONF.conf)

export default seq
