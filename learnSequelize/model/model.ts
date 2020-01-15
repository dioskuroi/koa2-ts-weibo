import {
 Table, Column, Model, AllowNull, DataType
} from 'sequelize-typescript'

@Table
export default class User extends Model<User> {
  @Column(DataType.STRING)
  userName: string

  @Column(DataType.STRING)
  password: string

  @AllowNull
  @Column(DataType.STRING)
  nickName: string
}
