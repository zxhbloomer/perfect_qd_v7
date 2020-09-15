
/**
 * 组织机构管理页面之间，进行通讯，兄弟通讯，
 * left：树
 * right：tabs
 *        tab1：组织机构
 *        tab2：集团信息
 *        tab3：企业信息
 *        tab4：部门信息
 *        tab5：岗位信息
 *        tab6：员工信息
 */
const EMIT_ORG_LEFT = 'global:org:getDataListLeft'
const EMIT_ORG_CHANGE = 'global:org:getDataList'
const EMIT_ORG_LOADING = 'global:org:getDataList_loading'
const EMIT_ORG_LOADING_OK = 'global:org:getDataList_loading_ok'
const EMIT_ORG_POSITION_UPDATED = 'global:org:position_updated'

/**
 * 部门权限页面之间，进行通讯，兄弟通讯，
 * left：树
 * right：tabs
 *        tab1：权限列表
 *        tab2：操作权限
 */
const EMIT_PERMISSION_DEPT_LEFT = 'global:permission_dept:getDataListLeft'
const EMIT_PERMISSION_DEPT_CHANGE = 'global:permission_dept:getDataList'
const EMIT_PERMISSION_DEPT_OPERATE_EDIT = 'global:permission_dept:edit_permission'
const EMIT_PERMISSION_DEPT_OPERATE_EDIT_OK = 'global:permission_dept:edit_permission_ok'
const EMIT_PERMISSION_DEPT_OPERATE_INFO = 'global:permission_dept:info_permission'
const EMIT_PERMISSION_DEPT_OPERATE_INFO_OK = 'global:permission_dept:info_permission_ok'
const EMIT_PERMISSION_DEPT_LOADING = 'global:permission_dept:getDataList_loading'
const EMIT_PERMISSION_DEPT_LOADING_OK = 'global:permission_dept:getDataList_loading_ok'
const EMIT_PERMISSION_DEPT_IS_EDIT = 'global:permission_dept:is_edit'

export default {
  /**
   * 组织机构管理页面之间，进行通讯，兄弟通讯，
   */
  EMIT_ORG_LEFT,
  EMIT_ORG_CHANGE,
  EMIT_ORG_LOADING,
  EMIT_ORG_LOADING_OK,
  EMIT_ORG_POSITION_UPDATED,
  /**
   * 部门权限页面之间，进行通讯，兄弟通讯，
   */
  EMIT_PERMISSION_DEPT_LEFT,
  EMIT_PERMISSION_DEPT_CHANGE,
  EMIT_PERMISSION_DEPT_OPERATE_EDIT,
  EMIT_PERMISSION_DEPT_OPERATE_EDIT_OK,
  EMIT_PERMISSION_DEPT_OPERATE_INFO,
  EMIT_PERMISSION_DEPT_OPERATE_INFO_OK,
  EMIT_PERMISSION_DEPT_LOADING,
  EMIT_PERMISSION_DEPT_LOADING_OK,
  EMIT_PERMISSION_DEPT_IS_EDIT
}
