import req from '../utils/request.js'

export function login(params) {
  return req.post('/users/checkLogin', params)
}

export function userAdd(params) {
  return req.post('/users/add', params)
}
export function userList(params) {
  return req.get('/users/list', params)
}
export function oldPass(params) {
  return req.get('/users/checkoldpwd', params)
}
export function emitPass(params) {
  return req.post('/users/editpwd', params)
}

export function delUser(params) {
  return req.get('/users/del', params)
}

// 批量删除

export function delMore(params) {
  return req.get('/users/batchdel', params)
}

// 修改账号

export function emitUser(params) {
  return req.post('/users/edit', params)
}

// 个人信息

export function getPersonal(params) {
  return req.get('/users/info', params)
}

// 头像修改

export function saveAvatar(params) {
  return req.get('/users/avataredit', params)
}
