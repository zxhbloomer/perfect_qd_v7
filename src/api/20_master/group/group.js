import request from '@/utils/request'

/**
 * 查询逻辑
 * @param {*} data
 */
export function getListApi (query) {
  return request({
    url: '/api/v1/org/group/list',
    method: 'post',
    data: query
  })
}

/**
 * 更新api
 * @param {*} data
 */
export function updateApi (data) {
  return request({
    url: '/api/v1/org/group/save',
    method: 'post',
    data
  })
}

/**
 * 插入api
 * @param {*} data
 */
export function insertApi (data) {
  return request({
    url: '/api/v1/org/group/insert',
    method: 'post',
    data
  })
}

/**
 * 导出逻辑，全部导出
 * @param {*} data
 */
export function exportAllApi (data) {
  return request({
    url: '/api/v1/org/group/export_all',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

/**
 * 导出逻辑，部分导出
 * @param {*} data
 */
export function exportSelectionApi (data) {
  return request({
    url: '/api/v1/org/group/export_selection',
    method: 'post',
    data,
    responseType: 'arraybuffer'
  })
}

/**
 * 导入逻辑
 * @param {*} data
 */
export function importExcelApi (data) {
  return request({
    url: '/api/v1/org/group/import',
    method: 'post',
    data
  })
}

/**
 * 删除逻辑
 * @param {*} data
 */
export function deleteApi (data) {
  return request({
    url: '/api/v1/org/group/delete',
    method: 'post',
    data
  })
}

/**
 * 启用逻辑
 * @param {*} data
 */
export function enableApi (data) {
  return request({
    url: '/api/v1/org/group/enable',
    method: 'post',
    data
  })
}
