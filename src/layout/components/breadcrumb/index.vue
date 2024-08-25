<script lang="tsx">
  import { useSystemStore } from '@/store/module/sys';
  import { storeToRefs } from 'pinia';
  import { Breadcrumb, BreadcrumbItem, Menu, MenuItem } from 'ant-design-vue';
  import { RouterLink } from 'vue-router';
  import { useConfigStore } from '@/store/module/config';
  import { Layout } from '@/enum/system';

  export default defineComponent({
    setup() {
      const sysStore = useSystemStore();
      const configStore = useConfigStore();
      const { fullMenus } = storeToRefs(sysStore);
      const { config } = storeToRefs(configStore);

      const Item = (item: any) => (
        <>
          {config.value.showHeaderBreadcrumbIcon &&
            item?.icon &&
            h(item?.icon, { style: { width: '16px' } })}
          <span class={[item?.icon ? 'ml-1' : '', 'text-sm']}>{item.title}</span>
        </>
      );

      const LinkItem = (item: any) => (
        <RouterLink class="flex items-center my-1" to={item.key}>
          {Item(item)}
        </RouterLink>
      );

      const MenuItems = (items: any[]) => (
        <Menu>
          {items.map((item) => {
            return <MenuItem>{LinkItem(item)}</MenuItem>;
          })}
        </Menu>
      );

      return () => (
        <>
          {config.value.showHeaderBreadcrumb && config.value.layoutMode !== Layout.TOP ? (
            <Breadcrumb class="system-breadcrumb" separator=">">
              {fullMenus.value.map((item, index) =>
                config.value.showHeaderBreadcrumbMenu && item?.children && item?.children.length ? (
                  <BreadcrumbItem
                    v-slots={{
                      overlay: () => MenuItems(item.children),
                    }}
                  >
                    {index <= fullMenus.value.length - 2 ? LinkItem(item) : Item(item)}
                  </BreadcrumbItem>
                ) : (
                  <BreadcrumbItem>
                    {index <= fullMenus.value.length - 2 ? LinkItem(item) : Item(item)}
                  </BreadcrumbItem>
                ),
              )}
            </Breadcrumb>
          ) : (
            <div></div>
          )}
        </>
      );
    },
  });
</script>

<style lang="scss" scoped>
  .ant-breadcrumb {
    font-size: 14px;

    li {
      display: flex;
      align-items: center;
    }

    :deep(.ant-breadcrumb-overlay-link) {
      display: inline-flex;
      align-items: center;
    }

    :deep(.ant-breadcrumb-link) {
      display: flex;
      align-items: center;

      .router-link-active {
        display: flex;
        align-items: center;
      }
    }

    :deep(.ant-breadcrumb-separator) {
      padding: 0 8px;
      margin-inline: unset;
    }
  }
</style>
