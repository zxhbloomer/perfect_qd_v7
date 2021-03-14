import { warn } from './util/warn'
import store from '@/store'

// 获取关闭参数
function getCloseArgs (args) {
  args = Array.from(args)

  const argsLen = args.length
  const arg = args[0] // 首个选项
  const arg2 = args[1] // 第二个选项

  if (!argsLen) {
    // close()
    return {}
  } else if (
    argsLen === 1 &&
    arg && typeof arg === 'object' &&
    !arg.name && !arg.fullPath && !arg.params && !arg.query && !arg.hash
  ) {
    // close({id, path, match, force, to, refresh})
    return arg
  } else if (typeof arg2 === 'boolean') {
    // close(path, match, force)
    const [path, match, force] = args
    return { path, match, force }
  } else {
    // close(path, to, match, force)
    const [path, to, match, force] = args
    return { path, to, match, force }
  }
}

// 页签操作
export default {
  computed: {
  },
  methods: {
    clickRouter (obj) {
      // 根据点击的页签，设置激活的顶部导航栏
      store.dispatch('permission/setTopNavActiveIndex', obj.topNavIndex)
    },

    /**
     * 打开页签（默认全新打开）
     * @param {location} path 页签路径
     * @param {Boolean} [isReplace = false] 是否 replace 方式替换当前路由
     * @param {Boolean} [refresh = true] 是否全新打开
     */
    open (path, isReplace = false, refresh = true) {
      if (refresh) this.refresh(path, false)
      this.$router[isReplace ? 'replace' : 'push'](path)
    },

    // 移除 tab 项
    async removeTab (id, force = false) {
      const { items } = this
      const idx = items.findIndex(item => item.id === id)

      // 最后一个页签不允许关闭
      if (!force && this.keepLastTab && items.length === 1) {
        throw new Error(this.lang.msg.keepLastTab)
      }

      if (!force) await this.pageLeavePromise(id, 'close')

      // 承诺关闭后移除页签和缓存
      this.$alive.remove(id)
      idx > -1 && items.splice(idx, 1)
    },

    /**
     * 关闭页签
     * 支持以下方式调用：
     *   1. this.$routerTab.close({id, path, match, force, to, refresh})
     *   2. this.$routerTab.close(path, match, force)
     *   3. this.$routerTab.close((path, to, match, force))
     * @param {String} id 通过页签 id 关闭
     * @param {location} path 通过路由路径关闭页签，如果未配置 id 和 path 则关闭当前页签
     * @param {Boolean} [match = true] path 方式关闭时，是否匹配 path 完整路径
     * @param {Boolean} [force = true] 是否强制关闭
     * @param {location} to 关闭后跳转的地址，为 null 则不跳转
     * @param {Boolean} [refresh = false] 是否全新打开跳转地址
     */
    async close () {
      // 解析参数
      let {
        id,
        // eslint-disable-next-line prefer-const
        path,
        // eslint-disable-next-line prefer-const
        match = true,
        // eslint-disable-next-line prefer-const
        force = true,
        to,
        // eslint-disable-next-line prefer-const
        refresh = false
      } = getCloseArgs(arguments)

      const { activeTabId, items, $router } = this

      // 根据 path 获取 id
      if (!id && path) {
        id = this.getIdByPath(path, match)
        if (!id) return
      }

      // 默认当前页签
      if (!id) id = activeTabId

      try {
        const idx = items.findIndex(item => item.id === id)

        // 移除页签
        await this.removeTab(id, force)

        // 为 null 不跳转
        if (to === null) return

        // 如果关闭当前页签，则打开后一个页签
        if (!to && activeTabId === id) {
          const nextTab = items[idx] || items[idx - 1]
          to = nextTab ? nextTab.to : this.defaultPath
        }

        if (to) {
          const toRoute = $router.match(to)

          // 目标地址与当前地址一致则强制刷新页面
          if (toRoute.fullPath === this.$route.fullPath) {
            this.refreshTab()
          } else {
            this.open(to, true, refresh)
          }
        }
      } catch (e) {
        warn(false, e)
      }
    },

    // 通过页签 id 关闭页签
    async closeTab (id = this.activeTabId, to, force = false) {
      this.close({ id, to, force })
    },

    /**
     * 通过路由地址刷新页签
     * @param {location} path 需要刷新的地址
     * @param {Boolean} [match = true] 是否匹配 target 完整路径
     * @param {Boolean} [force = true] 是否强制刷新
     */
    refresh (path, match = true, force = true) {
      if (path) {
        const id = this.getIdByPath(path, match)
        if (id) {
          this.refreshTab(id, force)
        }
      } else {
        this.refreshTab(undefined, force)
      }
    },

    // 刷新指定页签
    async refreshTab (id = this.activeTabId, force = false) {
      try {
        if (!force) await this.pageLeavePromise(id, 'refresh')
        this.$alive.remove(id)
        if (id === this.activeTabId) this.reloadView()
      } catch (e) {
        warn(false, e)
      }
    },

    /**
     * 刷新所有页签
     * @param {Boolean} [force = false] 是否强制刷新，如果强制则忽略页面 beforePageLeave
     */
    async refreshAll (force = false) {
      const { cache } = this.$alive
      for (const id in cache) {
        try {
          if (!force) await this.pageLeavePromise(id, 'refresh')
          this.$alive.remove(id)
        } catch (e) {
          console.log(e)
        }
      }
      this.reloadView()
    },

    /**
     * 重置 RouterTab 到默认状态，关闭所有页签并清理缓存页签数据
     * @param {location} [to = this.defaultPath] 重置后跳转页面
     */
    reset (to = this.defaultPath) {
      // 遍历删除缓存
      this.items.forEach(({ id }) => this.$alive.remove(id))

      // 清除缓存页签
      this.clearTabsStore()

      // 初始页签数据
      this.initTabs()

      const toRoute = this.$router.match(to)

      // 目标地址与当前地址一致则强制刷新页面
      if (toRoute.fullPath === this.$route.fullPath) {
        this.refreshTab()
      } else {
        this.$router.replace(to)
      }
    }
  }
}
