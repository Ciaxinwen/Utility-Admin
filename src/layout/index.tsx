import { storeToRefs } from 'pinia';
import { useConfigStore } from '@/store/module/config';
import { useSystemStore } from '@/store/module/sys';
import { Watermark } from 'ant-design-vue';
import Layout from './Layout.vue';

export default defineComponent({
  setup() {
    const configStore = useConfigStore();
    const sysStore = useSystemStore();
    const { config } = storeToRefs(configStore);

    onMounted(async () => {
      await sysStore.getMenus();
    });

    return () => (
      <>
        {config.value.showWaterMark ? (
          <Watermark content="Ant Design Vue">
            <Layout />
          </Watermark>
        ) : (
          <Layout />
        )}
      </>
    );
  },
});
