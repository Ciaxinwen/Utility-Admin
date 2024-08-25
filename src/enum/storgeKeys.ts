const sysTitle = import.meta.env.VITE_SYSTEM_NAME;

export class StorgeKeys {
  // 系统配置
  static readonly SYS_CONFIG = `${sysTitle}_SYS_CONFIG`;
  // 系统语言
  static readonly SYS_LANG = `${sysTitle}_SYS_LANG`;
  // token
  static readonly SYS_TOKEN = `${sysTitle}_SYS_TOKEN`;
  // 菜单数据
  static readonly MENU_DATA = `${sysTitle}_MENU_DATA`;
}
