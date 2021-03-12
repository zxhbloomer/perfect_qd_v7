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
      icon: 'year',
      name: '年度'
    }
  },
  {
    nav_path: '03',
    index: '3',
    type: 'T',
    meta: {
      icon: 'monthly',
      name: '月度'
    }
  },
  {
    nav_path: '04',
    index: '4',
    type: 'T',
    meta: {
      icon: '业务报表',
      name: '业务报表'
    }
  },
  {
    nav_path: '05',
    index: '5',
    type: 'T',
    meta: {
      icon: '系统管理',
      name: '系统管理'
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
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: {
      title: '总表',
      icon: '报表',
      noCache: true
    },
    children: [
      {
        path: '/sys/role',
        component: () => import('@/views/10_system/dicttype/dicttype'),
        name: 'P20000000', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '钢材成品销售合同', icon: '合同' }
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
      title: '总表',
      icon: '报表',
      noCache: true
    },
    children: [
      {
        path: '/sys/role',
        component: () => import('@/views/10_system/dicttype/dicttype'),
        name: 'P30000000', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '钢材成品销售合同', icon: '合同' }
      }
    ]
  }
]

// 第四个导航栏菜单
export const router_four = [
  {
    path: '',
    component: Layout,
    redirect: 'noRedirect',
    alwaysShow: true,
    meta: {
      title: '合同汇总表',
      icon: '报表',
      noCache: true
    },
    children: [
      {
        path: '/sys/role',
        component: () => import('@/views/10_system/dicttype/dicttype'),
        name: 'P40000000', // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
        meta: { title: '钢材成品销售合同', icon: '合同' }
      }
    ]
  }
]

// 第五个导航栏菜单
export const router_five = [
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
        meta: { title: '字典类型', closable: false }
      },
      {
        path: '/dic/dictdata',
        component: () => import('@/views/10_system/dictdata/dictdata'),
        name: 'P00000050',
        meta: { title: '字典数据', closable: true }
      }
    ]
  },
  {
    path: '/config',
    component: () => import('@/views/10_system/config/config'),
    name: 'P00000060',
    meta: { title: '系统参数', icon: '系统参数' }
  }
]

/**
 * 每个导航栏中的数据
 */
export const asyncRoutesArray = [[...router_one], [...router_two], [...router_three], [...router_four], [...router_five]]
export const asyncRoutesAll = [...router_one, ...router_two, ...router_three, ...router_four, ...router_five]
