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
  Unique
} from 'sequelize-typescript'

@Table({ tableName: 'users' })
export default class User extends Model<User> {
  @Unique
  @Comment('用户名，唯一')
  @Column(DataType.STRING)
  userName: string

  @Comment('密码')
  @Column(DataType.STRING)
  password: string

  @Comment('昵称')
  @Column(DataType.STRING)
  nickName: string

  @Comment('性别（1 男，2 女，3 保密）')
  @Column(DataType.DECIMAL)
  gender: number

  @AllowNull
  @Comment('头像 图片地址')
  @Column(DataType.STRING)
  picture?: string

  @AllowNull
  @Comment('城市')
  @Column(DataType.STRING)
  city?: string
}
