export const loginMixin = {
  data () {
    var validateAccount = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }

    var validateCode = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'))
      } else {
        callback()
      }
    }

    return {
      rules: {
        account: [
          { validator: validateAccount, trigger: 'blur'}
        ],
        psw: [
          { validator: validatePassword, trigger: 'blur'}
        ],
        piccode: [
          { validator: validateCode, trigger: 'blur'}
        ]
      }
    }
  }
}