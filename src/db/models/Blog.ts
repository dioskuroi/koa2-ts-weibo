/**
 * @description Blog 数据模型
 * @author 徐俊
 */

import { Table, Column, Comment, AllowNull, DataType, Model, BelongsTo, ForeignKey } from 'sequelize-typescript'
import { User } from './user'

@Table({ tableName: 'blogs' })
export class Blog extends Model<Blog> {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Comment('用户id')
  @Column(DataType.INTEGER)
  userId: number

  @AllowNull(false)
  @Comment('微博正文')
  @Column(DataType.TEXT)
  content: string

  @AllowNull(true)
  @Comment('图片地址')
  @Column(DataType.STRING)
  image?: string

  @BelongsTo(() => User)
  user: User
}
