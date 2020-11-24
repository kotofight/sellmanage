import req from '../utils/request.js'

// 获取商品分类
export function getHomeCharts(params) {
  return req.get('/order/totaldata', params)
}

// 获取商品分类
export function getOrderCharts(params) {
  return req.get('/order/ordertotal', params)
}
