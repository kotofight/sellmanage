import req from '../utils/request.js'

// 获取商品分类
export function getCateList(params) {
  return req.get('/goods/catelist', params)
}

// 添加商品分类
export function addCate(params) {
  return req.post('/goods/addcate', params)
}

// 删除商品分类
export function removeCates(params) {
  return req.get('/goods/delcate', params)
}

// 修改商品分类
export function editCates(params) {
  return req.post('/goods/editcate', params)
}

// 获取商品列表
export function getPros(params) {
  return req.get('/goods/list', params)
}
// 删除商品
export function delPros(params) {
  return req.get('/goods/del', params)
}

// 获取商品分类
export function getProCate(params) {
  return req.get('/goods/categories', params)
}

// 获取单个商品
export function getGoods(params) {
  return req.get('goods/goods', params)
}

// 添加商品
export function addPro(params) {
  return req.post('/goods/add', params)
}

// 修改商品
export function editPro(params) {
  return req.post('/goods/edit', params)
}

// 订单列表
export function getOrder(params) {
  return req.get('/order/list', params)
}

// 获取订单详情
export function getOrderDetails(params) {
  return req.get('/order/detail', params)
}

// 修改订单
export function editOrder(params) {
  return req.post('/order/edit', params)
}
