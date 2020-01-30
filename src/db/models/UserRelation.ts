/**
 * @description 用户关系 数据模型
 * @author 徐俊
 */

import {
  Table,
  Column,
  Model,
  AllowNull,
  DataType,
  Comment,
  ForeignKey,
  BelongsTo
} from 'sequelize-typescript'
import { User } from './User'

@Table({ tableName: 'userRelations' })
export class UserRelation extends Model<UserRelation> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Comment('用户id')
  @Column(DataType.INTEGER)
  userId: number

  @AllowNull(false)
  @ForeignKey(() => User)
  @Comment('被关注用户id')
  @Column(DataType.INTEGER)
  followerId: number

  @BelongsTo(() => User, 'followerId')
  user: User
}
