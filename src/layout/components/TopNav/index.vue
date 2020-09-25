<template>
  <div>
    <template>
      <el-menu
        mode="horizontal"
        class="topnav"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item,index) in permission_topNav" :key="index" :index="item.index">
          <svg-icon :icon-class="item.meta.icon" />
          <span slot="title" style="margin-left: 8px">{{ item.meta.name }}</span>
        </el-menu-item>
      </el-menu>
    </template>
  </div>
</template>

<style scoped>
  .topnav {
    background-color: transparent;
    float: left
  }
  .el-menu > .el-menu-item {
    display: inline-block;
    line-height: 50px;
    height: 50px;
    color: #fff;
    vertical-align: middle;
    border-bottom: none;
  }
  .el-menu>.el-menu-item.is-active {
    color: #fff!important;
    background-color: rgba(0, 0, 0, 0.2)!important;
  }
  .el-menu>.el-menu-item:hover {
    color: #fff!important;
    background-color: rgba(0,0,0,.1)!important
  }
</style>

<script>
import { mapGetters } from 'vuex'
import store from '@/store'
import router, { resetRouter } from '@/router'

export default {
  data() {
    return {
      // 监听器
      watch: {
        unwatch_active_index: null
      },
      activeIndex: undefined
    }
  },
  computed: {
    ...mapGetters([
      'permission_topNav',
      'permission_topNav_activeIndex'
    ])
  },
  watch: {
    // 'permission_topNav_activeIndex': {
    //   handler(newVal, oldVal) {
    //     this.activeIndex = newVal
    //     console.log(newVal)
    //     console.log(oldVal)
    //   },
    //   deep: true
    // }
  },
  created() {
    this.activeIndex = this.permission_topNav_activeIndex === '-1' ? '1' : this.permission_topNav_activeIndex
  },
  methods: {
    // 设置监听器
    setWatch() {
      this.unWatch()
      // 监听页面上面是否有修改，有修改按钮高亮
      this.watch.unwatch_active_index = this.$watch('permission_topNav_activeIndex', (newVal, oldVal) => {
        this.activeIndex = newVal
        console.log(1111)
        console.log(this.activeIndex)
        console.log([this.activeIndex])
        this.handleSelect(this.activeIndex, [this.activeIndex])
      },
      { deep: true }
      )
    },
    unWatch() {
      if (this.watch.unwatch_active_index) {
        this.watch.unwatch_active_index()
      }
    },
    handleSelect(key, keyPath) {
      this.unWatch()
      if (this.permission_topNav[key - 1].index === this.activeIndex) {
        return
      }
      this.activeIndex = this.permission_topNav[key - 1].index
      return new Promise(async resolve => {
        resetRouter()
        // 顶部导航栏处理
        // 获取路由处理
        const accessRoutes = await store.dispatch('permission/getPermissionAndSetTopNavAction', {
          pathOrIndex: this.permission_topNav[key - 1].index,
          type: this.PARAMETERS.TOP_NAV_FIND_BY_INDEX })
        // 动态添加路由
        router.addRoutes(accessRoutes)
        this.setWatch()
        resolve()
      })
    }
  }
}
</script>

