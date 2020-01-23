import User from 'src/db/models/user';

/**
 * @description 用户模块 数据结构
 * @author 徐俊
 */

export type UserInfoAttr = 'id' | 'userName' | 'nickName' | 'picture' | 'city'

export type UserInfo = Pick<User, UserInfoAttr>
