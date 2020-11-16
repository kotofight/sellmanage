const reg1 = /^([a-zA-Z0-9_-]|[\u4E00-\u9FA5]){3,13}$/
const reg2 = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z\\W]{6,18}$/

export function validateUsername(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入用户名'))
  } else if (!reg1.test(value)) {
    callback(new Error('请输入3-13位用户名，仅支持字母、数字、下划线和汉字'))
  } else {
    callback()
  }
}
export function validatePwd(rule, value, callback) {
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!reg2.test(value)) {
    callback(new Error('请输入6-18位密码，且必须同时包含字母和数字'))
  } else {
    callback()
  }
}

export function validateNewPass(o) {
  return function(rule, value, callback) {
    if (value === '') {
      callback(new Error('请输入新密码'))
    } else if (!reg2.test(value)) {
      callback(new Error('请输入6-18位密码，且必须同时包含字母和数字'))
    } else {
      if (o.passForm.checkPass !== '') {
        o.$refs.passForm.validateField('checkPass')
      }
      callback()
    }
  }
}

export function validateCheckPass(o) {
  return function(rule, value, callback) {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== o.passForm.pwd) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
}
