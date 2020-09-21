<template>
  <div>
    <template>
      <el-menu
        mode="horizontal"
        class="topnav"
        :default-active="activeIndex"
        @select="handleSelect"
      >
        <el-menu-item v-for="(item,index) in permission_topNav.data" :key="index" :index="item.index">
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
      activeIndex: undefined
    }
  },
  computed: {
    ...mapGetters([
      'permission_topNav',
      'userPermissionData'
    ])
  },
  watch: {
  },
  created() {
    this.activeIndex = this.permission_topNav.activeIndex === '-1' ? '1' : this.permission_topNav.activeIndex
  },
  methods: {
    handleSelect(key, keyPath) {
      if (this.permission_topNav.data[key - 1].index === this.activeIndex) {
        return
      }
      this.activeIndex = this.permission_topNav.data[key - 1].index

      return new Promise(async resolve => {
        resetRouter()
        // 顶部导航栏处理
        // 获取路由处理
        console.log(this.permission_topNav.data[key - 1])
        const accessRoutes = await store.dispatch('permission/getPermissionAndSetTopNavAction', {
          permission_data: this.userPermissionData,
          pathOrIndex: this.permission_topNav.data[key - 1].nav_path,
          type: this.PARAMETERS.TOP_NAV_FIND_BY_INDEX })

        // 动态添加路由
        router.addRoutes(accessRoutes)

        resolve()
      })
    }
  }
}
</script>

