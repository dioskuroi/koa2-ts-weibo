/**
 * @description 用户数据模型
 * @author 徐俊
 */

import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  Comment,
  Unique,
  Default,
  HasMany
} from 'sequelize-typescript'
import { UserModelInterface } from '../../types'
import { UserRelation } from './UserRelation'

@Table({ tableName: 'users' })
export class User extends Model<User> implements UserModelInterface {
  @Unique
  @AllowNull(false)
  @Comment('用户名，唯一')
  @Column(DataType.STRING)
  userName: string

  @AllowNull(false)
  @Comment('密码')
  @Column(DataType.STRING)
  password: string

  @AllowNull(false)
  @Comment('昵称')
  @Column(DataType.STRING)
  nickName: string

  @AllowNull(false)
  @Default(3)
  @Comment('性别（1 男，2 女，3 保密）')
  @Column(DataType.DECIMAL)
  gender: number

  @Comment('头像 图片地址')
  @Column(DataType.STRING)
  picture?: string

  @Comment('城市')
  @Column(DataType.STRING)
  city?: string

  @HasMany(() => UserRelation, 'userId')
  userRelations: UserRelation[]
}
