/**
 * @description @ 关系 数据模型
 * @author 徐俊
 */

import { Table, Column, Comment, AllowNull, DataType, Model, ForeignKey, Default } from 'sequelize-typescript'
import { Blog } from './Blog'
import { AtRelationInterface } from '../../types'

@Table({ tableName: 'atRelations' })
export class AtRelation extends Model<AtRelation> implements AtRelationInterface {
  @AllowNull(false)
  @Comment('用户id')
  @Column(DataType.INTEGER)
  userId: number

  @AllowNull(false)
  @ForeignKey(() => Blog)
  @Comment('微博 id')
  @Column(DataType.INTEGER)
  blogId: number

  @AllowNull(false)
  @Default(false)
  @Comment('是否已读')
  @Column(DataType.BOOLEAN)
  isRead: boolean
}
