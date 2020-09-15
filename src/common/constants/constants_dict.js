
/** 隐藏显示类型： 0：显示 1：隐藏 null:全部 */
const DICT_SYS_VISIBLE_TYPE = 'sys_visible_type'
const DICT_SYS_VISIBLE_TYPE_SHOW = '0'
const DICT_SYS_VISIBLE_TYPE_HIDDEN = '1'
const DICT_SYS_VISIBLE_TYPE_ALL = 'null'

/** 按钮类型： */
const DICT_BTN_NAME_TYPE = 'sys_btn_type'

/** 地址簿_tag标签  */
const DICT_SYS_ADDRESS_TAG_TYPE = 'sys_address_tag_type'

/** 企业类型  */
const DICT_SYS_COMPANY_TYPE = 'sys_company_type'

/** 性别  */
const DICT_SYS_SEX_TYPE = 'sys_sex_type'

/** 在职情况  */
const DICT_USR_SERVICE_TYPE = 'usr_service_type'

/** 学历  */
const DICT_USR_DEGREE_TYPE = 'usr_degree_type'

/** 婚否  */
const DICT_USR_WED_TYPE = 'usr_wed_type'

/** 登录用户类型  */
const DICT_USR_LOGIN_TYPE = 'usr_login_type'

/** 组织机构类型  */
const DICT_ORG_SETTING_TYPE = 'org_setting_type'
/** 组织机构类型：租户  */
const DICT_ORG_SETTING_TYPE_TENANT = '10'
/** 组织机构类型：集团  */
const DICT_ORG_SETTING_TYPE_GROUP = '20'
/** 组织机构类型：企业  */
const DICT_ORG_SETTING_TYPE_COMPANY = '30'
/** 组织机构类型：部门  */
const DICT_ORG_SETTING_TYPE_DEPT = '40'
/** 组织机构类型：岗位  */
const DICT_ORG_SETTING_TYPE_POSITION = '50'
/** 组织机构类型：人员  */
const DICT_ORG_SETTING_TYPE_STAFF = '60'
/** 登录模式：（10：手机号码；20：邮箱） */
const DICT_SYS_LOGIN_TYPE = 'sys_login_type'
/** 自动编码类型 */
const DICT_SYS_CODE_RULE_TYPE = 'sys_coderule_type'
/** 自动编码名称 */
const DICT_SYS_CODE_TYPE = 'sys_code_type'
/** 组织架构中已被使用 */
const DICT_ORG_USED_TYPE = 'org_used_type'
/** 显示组织机构中未被使用  */
const DICT_ORG_USED_TYPE_SHOW_UNUSED = '10'
/** 显示所有  */
const DICT_ORG_USED_TYPE_SHOW_ALL = null
/** 菜单类型  */
const DICT_SYS_MENU_TYPE = 'sys_menu_type'
/** 根结点  */
const DICT_SYS_MENU_TYPE_ROOT = 'R'
/** 顶部导航栏  */
const DICT_SYS_MENU_TYPE_TOPNAV = 'T'
/** 结点  */
const DICT_SYS_MENU_TYPE_NODE = 'N'
/** 页面  */
const DICT_SYS_MENU_TYPE_PAGE = 'P'
/** 权限类型  */
const DICT_MSTR_PERMISSION_TYPE = 'mstr_permission_type'
/** 部门权限  */
const DICT_MSTR_PERMISSION_TYPE_DEPT = '10'
/** 岗位权限  */
const DICT_MSTR_PERMISSION_TYPE_POSITION = '20'
/** 用户权限  */
const DICT_MSTR_PERMISSION_TYPE_USER = '30'
/** 排除权限  */
const DICT_MSTR_PERMISSION_TYPE_OUT = '40'

/** 删除类型：0：未删除 1：已删除  */
const DICT_SYS_DELETE_MAP = 'mstr_permission_type'
const DICT_SYS_DELETE_MAP_YES = '1'
const DICT_SYS_DELETE_MAP_NO = '0'
const DICT_SYS_DELETE_MAP_ALL = 'null'

export default {
  /** 隐藏显示类型： 0：显示 1：隐藏 null:全部 */
  DICT_SYS_VISIBLE_TYPE,
  DICT_SYS_VISIBLE_TYPE_SHOW,
  DICT_SYS_VISIBLE_TYPE_HIDDEN,
  DICT_SYS_VISIBLE_TYPE_ALL,
  /** 按钮类型： */
  DICT_BTN_NAME_TYPE,
  /** 地址簿_tag标签  */
  DICT_SYS_ADDRESS_TAG_TYPE,
  /** 企业类型  */
  DICT_SYS_COMPANY_TYPE,
  /** 性别  */
  DICT_SYS_SEX_TYPE,
  /** 在职情况  */
  DICT_USR_SERVICE_TYPE,
  /** 学历  */
  DICT_USR_DEGREE_TYPE,
  /** 婚否  */
  DICT_USR_WED_TYPE,
  /** 登录用户类型  */
  DICT_USR_LOGIN_TYPE,
  /** 组织机构类型  */
  DICT_ORG_SETTING_TYPE,
  /** 组织机构类型：租户  */
  DICT_ORG_SETTING_TYPE_TENANT,
  /** 组织机构类型：集团  */
  DICT_ORG_SETTING_TYPE_GROUP,
  /** 组织机构类型：企业  */
  DICT_ORG_SETTING_TYPE_COMPANY,
  /** 组织机构类型：部门  */
  DICT_ORG_SETTING_TYPE_DEPT,
  /** 组织机构类型：岗位  */
  DICT_ORG_SETTING_TYPE_POSITION,
  /** 组织机构类型：人员  */
  DICT_ORG_SETTING_TYPE_STAFF,
  /** 登录模式：（10：手机号码；20：邮箱） */
  DICT_SYS_LOGIN_TYPE,
  /** 自动编码类型 */
  DICT_SYS_CODE_RULE_TYPE,
  /** 自动编码名称 */
  DICT_SYS_CODE_TYPE,
  /** 组织架构中已被使用 */
  DICT_ORG_USED_TYPE,
  /** 显示组织机构中未被使用  */
  DICT_ORG_USED_TYPE_SHOW_UNUSED,
  /** 显示所有  */
  DICT_ORG_USED_TYPE_SHOW_ALL,
  /** 菜单类型  */
  DICT_SYS_MENU_TYPE,
  /** 根结点  */
  DICT_SYS_MENU_TYPE_ROOT,
  /** 顶部导航栏  */
  DICT_SYS_MENU_TYPE_TOPNAV,
  /** 结点  */
  DICT_SYS_MENU_TYPE_NODE,
  /** 页面  */
  DICT_SYS_MENU_TYPE_PAGE,
  /** 权限类型  */
  DICT_MSTR_PERMISSION_TYPE,
  /** 部门权限  */
  DICT_MSTR_PERMISSION_TYPE_DEPT,
  /** 岗位权限  */
  DICT_MSTR_PERMISSION_TYPE_POSITION,
  /** 用户权限  */
  DICT_MSTR_PERMISSION_TYPE_USER,
  /** 排除权限  */
  DICT_MSTR_PERMISSION_TYPE_OUT,
  /** 删除类型：0：未删除 1：已删除  */
  DICT_SYS_DELETE_MAP,
  DICT_SYS_DELETE_MAP_YES,
  DICT_SYS_DELETE_MAP_NO,
  DICT_SYS_DELETE_MAP_ALL
}
