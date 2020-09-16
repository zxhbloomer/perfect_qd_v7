import { constantRoutes, asyncRoutes2 } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const state = {
  // 顶部导航栏
  topNav: [],
  // 当前激活的菜单
  routes: [],
  addRoutes: []
}

const mutations = {
  // 添加当前路由
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  // 添加顶部导航栏
  SET_TOP_NAV: (state, topNav) => {
    state.topNav = topNav
  }
}

const actions = {
  setRoutes({ commit }, routers) {
    // 设置到vuex中是菜单树
    commit('SET_ROUTES', routers)
  },
  /**
   * 以下为手工代码，调试使用
   * @param {*} param0
   * @param {*} _data
   */
  setTopNavAndGetRouters({ commit }, _data) {
    return new Promise(resolve => {
      // TODO 此处修改，调试顶部导航栏
      const _topNavData = [
        {
          nav_code: '01',
          index: '1',
          type: 'T',
          meta: {
            icon: '系统管理',
            name: '工作台'
          }
        },
        {
          nav_code: '02',
          index: '2',
          type: 'T',
          meta: {
            icon: 'syscode',
            name: '业务管理'
          }
        },
        {
          nav_code: '03',
          index: '3',
          type: 'T',
          meta: {
            icon: 'syscode',
            name: '业务管理a'
          }
        }
      ]

      // 根据to的path，解析激活哪一个顶部导航栏
      const _topNav = {
        data: _topNavData,
        activeIndex: '-1'
      }
      const url = _data.to.path.split('/')[1]
      const _activeIndex = _topNavData.filter(item => item.nav_code === url)[0]
      if (_activeIndex) {
        _topNav.activeIndex = _activeIndex
      } else {
        // todo:error??
      }
      // 把顶部导航栏，设置到vuex中去
      commit('SET_TOP_NAV', _topNav)
      commit('SET_ROUTES', asyncRoutes2)
      // 设置菜单
      resolve(asyncRoutes2)
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
