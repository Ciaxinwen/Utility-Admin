import { defineComponent } from 'vue';
import { useConfigStore } from '@/store/module/config.ts';
import { storeToRefs } from 'pinia';
import { Layout } from '@/enum/system';
import { theme } from 'ant-design-vue';

const navItemClass =
  'box-border w-100px h-80px border-solid  border-#e1e1e1 dark:border-#464852 overflow-hidden p-1.5 flex gap-1 cursor-pointer ';

function useUtils(bgColor: string) {
  const { useToken } = theme;
  const themeToken = useToken().token;
  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);

  const navItemStyle = computed(() => {
    return (mode: Layout) => {
      return {
        borderColor: config.value.layoutMode === mode ? bgColor : '',
        borderWidth: config.value.layoutMode === mode ? '2px' : '1px',
        borderRadius: `${themeToken.value.borderRadius}px`,
      };
    };
  });

  return { themeToken, config, navItemStyle };
}

export const LeftModeItem = defineComponent({
  name: 'LeftMode',
  props: {
    bgColor: {
      type: String,
      default: 'var(--theme-color)',
    },
  },
  setup(props) {
    const { config, navItemStyle } = useUtils(props.bgColor);

    return () => {
      const style = { backgroundColor: props.bgColor };
      return (
        <div
          class={`nav-node-item ${navItemClass}`}
          style={navItemStyle.value(Layout.LEFT)}
          onClick={() => {
            config.value.layoutMode = Layout.LEFT;
          }}
        >
          <div class="w-1/4 h-full rounded-4px opacity-80" style={style}></div>
          <div class="h-full flex-grow-1 flex flex-col gap-1">
            <div class="h-1/3 rounded-4px opacity-60" style={style}></div>
            <div class="flex-grow-1 rounded-4px opacity-30" style={style}></div>
          </div>
        </div>
      );
    };
  },
});

export const TopModeItem = defineComponent({
  name: 'TopMode',
  props: {
    bgColor: {
      type: String,
      default: 'var(--theme-color)',
    },
  },
  setup(props) {
    const { config, navItemStyle } = useUtils(props.bgColor);

    return () => {
      const style = { backgroundColor: props.bgColor };
      return (
        <div
          class={`nav-node-item ${navItemClass} flex-col`}
          style={navItemStyle.value(Layout.TOP)}
          onClick={() => {
            config.value.layoutMode = Layout.TOP;
          }}
        >
          <div class="h-1/4 w-full rounded-4px opacity-80" style={style}></div>
          <div class="flex-grow-1 rounded-4px opacity-40" style={style}></div>
        </div>
      );
    };
  },
});

export const MixModeItem = defineComponent({
  name: 'MixMode',
  props: {
    bgColor: {
      type: String,
      default: 'var(--theme-color)',
    },
  },
  setup(props) {
    const { config, navItemStyle } = useUtils(props.bgColor);

    return () => {
      const style = { backgroundColor: props.bgColor };
      return (
        <div
          class={`nav-node-item ${navItemClass}`}
          style={navItemStyle.value(Layout.MIX)}
          onClick={() => {
            config.value.layoutMode = Layout.MIX;
          }}
        >
          <div class="w-1/7 h-full rounded-4px opacity-60" style={style}></div>
          <div class="w-1/5 h-full rounded-4px opacity-70" style={style}></div>
          <div class="h-full flex-grow-1 flex flex-col gap-1">
            <div class="h-1/3 rounded-4px opacity-80" style={style}></div>
            <div class="flex-grow-1 rounded-4px opacity-30" style={style}></div>
          </div>
        </div>
      );
    };
  },
});
