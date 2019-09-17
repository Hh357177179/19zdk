export const addfishMixin = {
  data () {
    var validateTitle = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请输入钓场名称'))
      } else {
        callback()
      }
    }

    var validateImg = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请上传图片'))
      } else {
        callback()
      }
    }
    
    var validatePlace = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请选择城市'))
      } else {
        callback()
      }
    }

    var validateAddress = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请填写地址'))
      } else {
        callback()
      }
    }

    var validateContent = (rule, value, callback) => {
      if (value == '') {
        return callback(new Error('请填写钓场简介'))
      } else {
        callback()
      }
    }

    return {
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur'}
        ],
        images: [
          { validator: validateImg, trigger: 'blur'}
        ],
        province: [
          { validator: validatePlace, trigger: 'change'}
        ],
        address: [
          { validator: validateAddress, trigger: 'blur'}
        ],
        content: [
          { validator: validateContent, trigger: 'blur'}
        ]
      }
    }
  }
}