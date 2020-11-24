import req from '../utils/request.js'

// 获取店铺
export function getShopInfo(params) {
  return req.get('/shop/info', params)
}

// 修改店铺
export function editShopInfo(params) {
  return req.post('/shop/edit', params)
}
