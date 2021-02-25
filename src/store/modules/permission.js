import { constantRoutes, asyncRoutes, convertToOneRouter, setAsyncRouters, setRedirectRouter, deepRecursiveLoadComponent } from '@/router'
import { getPermissionAndTopNavApi } from '@/api/user'
import deepcopy from 'deep-copy'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
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
export function filterAsyncRoutes (routes, roles) {
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
  topNavActiveIndex: '',
  // 当前激活的菜单
  menus: [],
  addRoutes: [],
  // 菜单权限和操作权限信息
  permission_data: {}
}

const mutations = {
  // 添加默认路由，需要包含url根目录redirect跳转
  SET_MENUS_ROUTERS: (state, menus) => {
    state.addRoutes = menus
    state.menus = constantRoutes.concat(menus)
  },
  // 添加顶部导航栏数据
  SET_TOP_NAV: (state, topNav) => {
    state.topNav = topNav
  },
  SET_TOP_NAV_ACTIVE_INDEX: (state, topNavActiveIndex) => {
    state.topNavActiveIndex = topNavActiveIndex
  },
  SET_PERMISSION_DATA: (state, permission_data) => {
    state.permission_data = permission_data
  }
}

const actions = {
  setRoutes ({ commit }, routers) {
    // 设置到vuex中是菜单树
    commit('SET_MENUS_ROUTERS', routers)
  },
  setTopNavActiveIndex ({ commit }, topNavIndex) {
    // 设置到vuex中是菜单树
    commit('SET_TOP_NAV_ACTIVE_INDEX', topNavIndex)
  },
  getPermissionAndSetTopNavAction ({ commit }, _data) {
    return new Promise((resolve, reject) => {
      // 获取权限，顶部导航栏，操作权限数据
      getPermissionAndTopNavApi(_data.pathOrIndex, _data.type).then(response => {
        const { data } = response
        if (!data) {
          reject('验证失败，请重新登录')
        }

        const { top_nav_data, user_permission_menu, all_routers, user_permission_operation, redirect, nodes_id } = data
        commit('SET_PERMISSION_DATA', {
          permission_top_nav: top_nav_data,
          permission_menu: user_permission_menu,
          permission_operation: user_permission_operation,
          permission_redirect: redirect,
          nodes_id: nodes_id
        })
        // 根据to的path，解析激活哪一个顶部导航栏
        // 把顶部导航栏，设置到vuex中去
        commit('SET_TOP_NAV', top_nav_data.data)
        commit('SET_TOP_NAV_ACTIVE_INDEX', top_nav_data.active_index)

        /**
         *  设置菜单
         *  需要注意：菜单和router不是一一匹配的
         *  此处把菜单格式化成自有一个节点的router,asyncRoutes
         *  把菜单返回给左侧sidebar显示，但是router是一个节点向下的
         *
         *  最后还需要考虑redirect的数据，该数据需要包含到'SET_MENUS_ROUTERS'的vuex中
         */
        // 动态读取所有路由中的component，成为对象，没有层级
        deepRecursiveLoadComponent(all_routers)
        // 设置到异步对象中去
        const convertData = setAsyncRouters(all_routers)
        // 设置根节点跳转的url
        setRedirectRouter(redirect)
        // 菜单设置到vuex中
        commit('SET_MENUS_ROUTERS', user_permission_menu)
        // 返回格式化好的路由
        resolve(convertData)
      }).catch(error => {
        reject(error)
      })
    })
  },

  /**
   * 以下为手工代码，调试使用
   * @param {*} param0
   * @param {*} _data
   */
  getPermissionAndSetTopNavAction2 ({ commit }, _data) {
    return new Promise(resolve => {
      // TODO 此处修改，调试顶部导航栏
      const _topNavData = [
        {
          nav_path: '01',
          index: '1',
          type: 'T',
          meta: {
            icon: '系统管理',
            name: '工作台'
          }
        },
        {
          nav_path: '02',
          index: '2',
          type: 'T',
          meta: {
            icon: 'syscode',
            name: '业务管理'
          }
        },
        {
          nav_path: '03',
          index: '3',
          type: 'T',
          meta: {
            icon: 'syscode',
            name: '业务管理a'
          }
        }
      ]

      commit('SET_TOP_NAV_ACTIVE_INDEX', '1')
      // 把顶部导航栏，设置到vuex中去
      commit('SET_TOP_NAV', _topNavData)

      /** 设置菜单
       *  需要注意：菜单和router不是一一匹配的
       *  此处把菜单格式化成自有一个节点的router
       *  把菜单返回给左侧sidebar显示，但是router是一个节点向下的
       *
       *  最后还需要考虑redirect的数据，该数据需要包含到'SET_MENUS_ROUTERS'的vuex中
      */
      var _routers = deepcopy(asyncRoutes)
      const convertData = convertToOneRouter(_routers)
      const redirect_data = {
        redirect: '/dashboard',
        path: 'dashboard',
        component: '/01_dashboard/index',
        meta: {
          title: '首页', icon: 'dashboard', affix: true
        }
      }
      setRedirectRouter(redirect_data)
      commit('SET_MENUS_ROUTERS', asyncRoutes)
      resolve(convertData)
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
