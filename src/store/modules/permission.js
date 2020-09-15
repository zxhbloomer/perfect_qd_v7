import { asyncRoutes, asyncRoutes2, resetRouter, setRedirectRouter, convertToOneRouter, constantRoutes, setDefaultPageStatic, setAccessRouters, deepRecursiveLoadComponent } from '@/router'
import deepcopy from 'deep-copy'

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
    debugger
    setAccessRouters(routers)
    // 设置到vuex中是菜单树
    commit('SET_ROUTES', routers)
  },
  /**
   * getTopNavAndRoutes，菜单设置入口点
   * @param {*} param0
   * @param {*} roles
   */
  getTopNavAndRoutes({ commit }, _data) {
    return new Promise(resolve => {
      // 定义菜单数组
      const topNavData = []
      // 此处修改，动态显示顶部导航栏
      const _topNav = _data.permission_data.user_permission_menu
      let i = 0
      // 循环格式化菜单
      for (const item of _topNav[0].children) {
        // 递归循环，读取component
        deepRecursiveLoadComponent(item)
        /**
         * R: 根节点
         * T: 顶部导航栏
         * P: page
         */
        if (item.type === 'T') {
          i++
          const tmpTopNav = {
            index: i + '',
            type: item.type,
            meta: item.meta,
            menus: null,
            routers: [...item.children]
          }
          var _routers = deepcopy(tmpTopNav.routers)
          // const convertData = convertToOneRouter(_routers)
          tmpTopNav.menus = _routers
          topNavData.push(tmpTopNav)
        }
      }
      // 设置到vuex中是菜单树
      commit('SET_TOP_NAV', topNavData)
      commit('SET_ROUTES', topNavData[0].routers)
      setRedirectRouter('/01/dashboard', topNavData[0].routers)
      resetRouter()
      debugger
      // 返回的是一级路由，设置到router中
      resolve(topNavData[0].menus)
    })
  },
  /**
   * 以下为手工代码，调试使用
   * @param {*} param0
   * @param {*} _data
   */
  getTopNavAndRoutes2({ commit }, _data) {
    return new Promise(resolve => {
      // TODO 此处修改，调试顶部导航栏
      const _topNav = [
        {
          index: '1',
          type: 'T',
          meta: {
            icon: '系统管理',
            name: '工作台'
          },
          menus: null,
          routers: asyncRoutes
        },
        {
          index: '2',
          type: 'T',
          meta: {
            icon: 'syscode',
            name: '业务管理'
          },
          menus: null,
          routers: asyncRoutes2
        },
        {
          index: '3',
          type: 'T',
          meta: {
            icon: 'syscode',
            name: '业务管理a'
          },
          menus: null,
          routers: asyncRoutes
        }
      ]

      // 循环格式化菜单
      for (const item of _topNav) {
        if (item.type === 'T') {
          var _routers = deepcopy(item.routers)
          const convertData = convertToOneRouter(_routers)
          item.menus = convertData
        }
      }
      // 设置到vuex中是菜单树
      commit('SET_TOP_NAV', _topNav)
      commit('SET_ROUTES', _topNav[0].routers)
      // 设置默认菜单
      setDefaultPageStatic(_data.permission_data.default_page)
      // 返回的是一级路由，设置到router中
      resolve(_topNav[0].menus)
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
