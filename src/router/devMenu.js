/* Layout */
import Layout from '@/layout'

/**
 * 顶部导航栏
 */
export const topNav = [
  {
    nav_path: '01',
    index: '1',
    type: 'T',
    meta: {
      icon: 'chart',
      name: '管理驾驶舱'
    }
  },
  {
    nav_path: '02',
    index: '2',
    type: 'T',
    meta: {
      icon: '系统管理',
      name: '系统管理'
    }
  },
  {
    nav_path: '03',
    index: '3',
    type: 'T',
    meta: {
      icon: '组织机构管理',
      name: '组织机构管理'
    }
  }
]

// 第一个导航栏菜单
export const router_one = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'P10000000', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/01_dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', affix: true, fulltitle: ['首页'] }
      }
    ]
  }
]

// 第二个导航栏菜单
export const router_two = [
  {
    path: '',
    // component: subMenu,
    redirect: 'noRedirect',
    // name: 'M00000020', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    alwaysShow: true,
    meta: {
      title: '字典管理',
      icon: '字典管理',
      noCache: true
    },
    children: [
      {
        path: '/dic/dicttype',
        component: () => import('@/views/10_system/dicttype/dicttype'),
        name: 'P00000030',
        meta: { title: '字典类型' }
      },
      {
        path: '/dic/dictdata',
        component: () => import('@/views/10_system/dictdata/dictdata'),
        name: 'P00000050',
        meta: { title: '字典数据' }
      }
    ]
  }, {
    path: '',
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: {
      title: '系统设置',
      icon: '系统设置',
      noCache: true
    },
    children: [
      {
        path: '/set/resource',
        component: () => import('@/views/10_system/resource/resource'),
        name: 'P00000020',
        meta: { title: '资源管理', icon: '资源管理' }
      },
      {
        path: '/set/syscode',
        component: () => import('@/views/00_platform/syscode/syscode'),
        name: 'P00000180',
        meta: { title: '系统编码', icon: 'syscode' }
      },
      {
        path: '/set/config',
        component: () => import('@/views/10_system/config/config'),
        name: 'P00000180',
        meta: { title: '系统参数', icon: '系统参数' }
      },
      {
        path: '/set/icons',
        component: () => import('@/views/10_system/icons/icon'),
        name: 'P00000230',
        meta: { title: '系统icon', icon: 'icons' }
      }
    ]
  }, {
    path: '',
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: {
      title: '功能管理',
      icon: 'function',
      noCache: true
    },
    children: [
      {
        path: '/fun/funs',
        component: () => import('@/views/10_system/pages/function/function'),
        name: 'P00000220',
        meta: { title: '按钮维护', icon: 'buttons' }
      },
      {
        path: '/fun/pages',
        component: () => import('@/views/10_system/pages/page/page'),
        name: 'P00000200',
        meta: { title: '页面维护', icon: 'syscode' }
      },
      {
        path: '/set/config',
        component: () => import('@/views//10_system/pages/page_function/page_function'),
        name: 'P00000210',
        meta: { title: '页面按钮维护', icon: 'page_fun' }
      },
      {
        path: '/fun/menus',
        component: () => import('@/views/20_master/menus/menu'),
        name: 'P00000240',
        meta: { title: '菜单维护', icon: 'menus' }
      }
    ]
  }
]

// 第三个导航栏菜单
export const router_three = [
  {
    path: '',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: {
      title: '租户管理',
      icon: '租户管理',
      noCache: true
    },
    children: [
      {
        path: 'tenant',
        component: () => import('@/views/10_system/tenant/tenant'),
        name: 'P00000080',
        meta: { title: '租户管理', icon: 'tenant' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: {
      title: '织机构管理',
      icon: 'tree',
      noCache: true
    },
    children: [
      {
        path: '/org/orginfo',
        component: () => import('@/views/20_master/org/org'),
        name: 'P00000170', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '组织机构管理', icon: '组织架构' }
      },
      {
        path: '/org/group',
        component: () => import('@/views/20_master/group/group'),
        name: 'P00000100', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '集团信息', icon: 'group' }
      },
      {
        path: '/org/company',
        component: () => import('@/views/20_master/company/company'),
        name: 'P00000110', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '企业信息', icon: 'company' }
      },
      {
        path: '/org/dept',
        component: () => import('@/views/20_master/dept/dept'),
        name: 'P00000150', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '部门信息', icon: 'dept' }
      },
      {
        path: '/org/position',
        component: () => import('@/views/20_master/position/position'),
        name: 'P00000160', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '岗位信息', icon: 'position' }
      },
      {
        path: '/org/staff',
        component: () => import('@/views/20_master/staff/staff'),
        name: 'P00000140', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '员工管理', icon: 'staff' }
      }
    ]
  },
  {
    path: '',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: {
      title: '权限管理',
      icon: '权限管理',
      noCache: true
    },
    children: [
      {
        path: 'dept',
        component: () => import('@/views/20_master/permission/dept/permission_dept'),
        name: 'P00000250',
        meta: { title: '部门权限维护', icon: 'permission' }
      },
      {
        path: 'fun',
        // component: subMenu,
        redirect: 'noRedirect',
        alwaysShow: true,
        meta: { title: '权限配置管理', icon: '配置', noCache: true },
        children: [
          {
            path: 'funs',
            component: () => import('@/views/10_system/pages/function/function'),
            name: 'P00000220',
            meta: { title: '按钮维护' }
          },
          {
            path: 'pages',
            component: () => import('@/views/10_system/pages/page/page'),
            name: 'P00000200',
            meta: { title: '页面维护' }
          },
          {
            path: 'page_fun',
            component: () => import('@/views/10_system/pages/page_function/page_function'),
            name: 'P00000210',
            meta: { title: '页面按钮维护' }
          },
          {
            path: 'menus',
            component: () => import('@/views/20_master/menus/menu'),
            name: 'P00000240',
            meta: { title: '菜单维护' }
          }
        ]
      }
    ]
  }
]

/**
 * 每个导航栏中的数据
 */
export const asyncRoutesArray = [[...router_one], [...router_two], [...router_three]]
export const asyncRoutesAll = [...router_one, ...router_two, ...router_three]
