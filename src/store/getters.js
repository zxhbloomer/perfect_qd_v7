const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  // 菜单router
  permission_menus_routers: state => state.permission.menus,
  // 顶部导航栏
  permission_topNav: state => state.permission.topNav,
  permission_topNav_activeIndex: state => state.permission.topNavActiveIndex,
  /** 菜单权限和操作权限信息 */
  userPermissionData: state => state.permission.permission_data,
  errorLogs: state => state.errorLog.logs,
  /** add by zxh */
  program: state => state.popUpSearchDialog.program,
  selectedDataJson: state => state.popUpSearchDialog.selectedDataJson,
  formatRouter: state => state.formatRouter.isdo,
  /** user session bean */
  userSessionBean: state => state.user.session_bean
}
export default getters
