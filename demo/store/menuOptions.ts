export const menuOptions = [
  {
    type: "group",
    label: "通用组件",
    key: "通用组件",
    children: [
      {
        label: "头像",
        key: "avatar",
        extra: "Avatar",
      },
      {
        label: "按钮",
        key: "button",
        extra: "Button",
      },
      {
        label: "卡片",
        key: "card",
        extra: "Card",
      },
      {
        label: "图标",
        key: "icon",
        extra: "Icon",
      },
      {
        label: "标签",
        key: "tag",
        extra: "Tag",
      },
      {
        label: "分割线",
        key: "divider",
        extra: "Divider",
      },
      {
        label: "折叠面板",
        key: "collapse",
        extra: "Collapse",
      },
      {
        label: "下拉菜单",
        key: "dropdown",
        extra: "Dropdown",
      },
      {
        label: "滚动条",
        key: "scrollbar",
        extra: "Scrollbar",
      },
      {
        label: "排印",
        key: "typography",
        extra: "Typography",
      },
    ],
  },
  {
    type: "group",
    label: "数据展示组件",
    key: "数据展示组件",
    children: [
      {
        label: "表格",
        key: "table",
        extra: "Table",
      },
      {
        label: "数据表格",
        key: "data-table",
        extra: "Data Table",
      },
      {
        label: "代码",
        key: "code",
        extra: "Code",
      },
      {
        label: "图像",
        key: "image",
        extra: "Image",
      },
      {
        label: "时间线",
        key: "timeline",
        extra: "Timeline",
      },
    ],
  },
  {
    type: "group",
    label: "数据录入组件",
    key: "数据录入组件",
    children: [
      {
        label: "自动填充",
        key: "auto-complete",
        extra: "Auto Complete",
      },
      {
        label: "动态标签",
        key: "dynamic-tags",
        extra: "Dynamic Tags",
      },
      {
        label: "表单",
        key: "form",
        extra: "Form",
      },
      {
        label: "文本输入",
        key: "input",
        extra: "Input",
      },
      {
        label: "数字输入",
        key: "input-number",
        extra: "Input Number",
      },
      {
        label: "上传",
        key: "upload",
        extra: "Upload",
      },
      {
        label: "开关",
        key: "switch",
        extra: "Switch",
      },
      {
        label: "单选",
        key: "radio",
        extra: "Radio",
      },
      {
        label: "复选框",
        key: "checkbox",
        extra: "Checkbox",
      },
      {
        label: "选择器",
        key: "select",
        extra: "Select",
      },
      {
        label: "滑动选择",
        key: "slider",
        extra: "Slider",
      },
    ],
  },
  {
    type: "group",
    label: "反馈组件",
    key: "反馈组件",
    children: [
      {
        label: "警告",
        key: "alert",
        extra: "Alert",
      },
      {
        label: "标记",
        key: "badge",
        extra: "Badge",
      },
      {
        label: "抽屉",
        key: "drawer",
        extra: "Drawer",
      },
      {
        label: "弹出消息",
        key: "popover",
        extra: "Popover",
      },
      {
        label: "对话框",
        key: "dialog",
        extra: "Dialog",
      },
      {
        label: "信息",
        key: "message",
        extra: "Message",
      },
      {
        label: "模态框",
        key: "modal",
        extra: "Modal",
      },
      {
        label: "骨架屏",
        key: "skeleton",
        extra: "Skeleton",
      },
    ],
  },
  {
    type: "group",
    label: "导航组件",
    key: "导航组件",
    children: [
      {
        label: "菜单",
        key: "menu",
        extra: "Menu",
      },
      {
        label: "加载条",
        key: "loading-bar",
        extra: "LoadingBar",
      },
      {
        label: "侧边导航",
        key: "anchor",
        extra: "Anchor",
      },
      {
        label: "分页",
        key: "pagination",
        extra: "Paginstion",
      },
      {
        label: "步骤",
        key: "steps",
        extra: "Steps",
      },
      {
        label: "标签页",
        key: "tabs",
        extra: "Tabs",
      },
    ],
  },
  {
    type: "group",
    label: "布局组件",
    key: "test-3",
    children: [
      {
        label: "布局",
        key: "layout",
        extra: "Layout",
      },
      {
        label: "间距",
        key: "space",
        extra: "Space",
      },
      {
        label: "网格",
        key: "grid",
        extra: "Grid",
      },
    ],
  },
  {
    type: "group",
    label: "配置组件",
    key: "test-4",
    children: [
      {
        label: "全局化配置",
        key: "config-provider",
        extra: "Config Provider",
      },
      {
        label: "全局样式",
        key: "global-style",
        extra: "Global Style",
      },
    ],
  },
  {
    type: "group",
    label: "测试组件",
    key: "test-2",
    children: [
      {
        label: "测试",
        key: "test",
        extra: "Test",
      },
    ],
  },
];

type MenuOptions = typeof menuOptions;
function getMenuItem(menuOptions: MenuOptions) {
  const menuItemOptions: {
    label: string;
    key: string;
    extra: string;
  }[] = [];
  for (let item of menuOptions) {
    item.children.forEach((element) => {
      menuItemOptions.push(element);
    });
  }
  return menuItemOptions;
}
export const menuItemOptions = getMenuItem(menuOptions);
