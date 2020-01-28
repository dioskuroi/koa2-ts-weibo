/**
 * @description response code
 * @author 徐俊
 */

enum ResCode {
  ERR_OK = 0,
  ERR_REGISTER_USERNAME_EXIST = 10001,
  ERR_REGISTER_FAIL = 10002,
  ERR_REGISTER_USERNAME_NOT_EXIST = 10003,
  ERR_LOGIN_FAIL = 10004,
  ERR_LOGIN_CHECK_FAIL = 10005,
  ERR_CHANGE_PASSOWRD_FAIL = 10006,
  ERR_UPLOAD_FILE_SIZE_FAIL = 10007,
  ERR_CHANGE_INFO_FAIL = 10008,
  ERR_VALIDATE_JSON_SCHEMA_FAIL = 10009,
  ERR_DELETE_USER_FAIL = 10010,
  ERR_CREATE_BLOG_FALI = 11001
}


export default ResCode
