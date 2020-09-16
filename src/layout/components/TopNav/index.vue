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

export default {
  data() {
    return {
      activeIndex: undefined
    }
  },
  computed: {
    ...mapGetters([
      'permission_topNav'
    ])
  },
  watch: {
  },
  created() {
    console.log(11111)
    this.activeIndex = this.permission_topNav.activeIndex === '-1' ? '1' : this.permission_topNav.activeIndex
    console.log(this.activeIndex)
    console.log(this.permission_topNav)
  },
  methods: {
    handleSelect(key, keyPath) {
      if (this.permission_topNav.data[key - 1].index === this.activeIndex) {
        return
      }
      this.activeIndex = this.permission_topNav.data[key - 1].index
    }
  }
}
</script>

