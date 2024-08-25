<template>
  <a-modal class="sys-search-modal" v-model:open="open" :closable="false">
    <a-input
      ref="inputRef"
      v-model:value="searchText"
      class="h-46px text-16px"
      size="large"
      :placeholder="$t('common.search.desc')"
      allowClear
      @keydown="handleKeydown"
    >
      <template #prefix>
        <SearchOutlined mr-1.5 />
      </template>
    </a-input>

    <div class="my-3">
      <template v-if="searchResult.length">
        <div
          p-3
          rounded-2
          cursor-pointer
          shadow-md
          flex
          items-center
          justify-between
          mb-4
          text-16px
          :style="{
            color: activeIndex === index ? '#fff' : '',
            backgroundColor: activeIndex === index ? config.themeColor : '',
          }"
          v-for="(item, index) in searchResult"
          :key="item.id"
          @click="handleGoResult(item)"
          @mouseover="activeIndex = index"
        >
          <div class="flex items-center gap-2">
            <div class="i-ri:pages-line"></div>
            <div>{{ item.title }}</div>
          </div>
          <div class="i-ri:corner-right-down-line rotate-90"></div>
        </div>
      </template>

      <a-empty v-else class="my-10" description="" />
    </div>

    <template #footer>
      <div class="flex items-center gap-4">
        <div class="flex items-center gap-2">
          <div class="bg-#f2f3f5 p-1.5 rounded-1 drop-shadow-md dark:bg-#313131">
            <div class="i-ri:corner-right-down-line rotate-90"></div>
          </div>
          <div>{{ $t('common.search.confirm') }}</div>
        </div>
        <div class="flex items-center gap-2">
          <div class="bg-#f2f3f5 p-1.5 rounded-1 drop-shadow-md dark:bg-#313131">
            <div class="i-ri:arrow-up-line"></div>
          </div>
          <div class="bg-#f2f3f5 p-1.5 rounded-1 drop-shadow-md dark:bg-#313131">
            <div class="i-ri:arrow-down-line"></div>
          </div>
          <div>{{ $t('common.search.toggle') }}</div>
        </div>
        <div class="flex items-center gap-2">
          <div class="bg-#f2f3f5 py-0.5 px-1.5 rounded-1 drop-shadow-md dark:bg-#313131">
            <span>esc</span>
          </div>
          <div>{{ $t('common.search.close') }}</div>
        </div>
      </div>
    </template>
  </a-modal>
</template>

<script lang="ts" setup>
  import { useSystemStore } from '@/store/module/sys';
  import { storeToRefs } from 'pinia';
  import { buildUUID } from '@/utils/uuid';
  import { useI18n } from 'vue-i18n';
  import { debounce } from 'lodash';
  import { useConfigStore } from '@/store/module/config';

  interface SearchResSourceData {
    id: string;
    path: string;
    title: string;
  }

  const open = defineModel('open', { type: Boolean, default: false });

  const router = useRouter();

  const configStore = useConfigStore();
  const sysStore = useSystemStore();
  const { menus } = storeToRefs(sysStore);
  const { config } = storeToRefs(configStore);
  const { locale } = useI18n();

  const searchText = ref('');
  const inputRef = ref();

  const sourceData = ref<SearchResSourceData[]>([]);
  const searchResult = ref<SearchResSourceData[]>([]);

  function genResult(list: any[]) {
    list?.forEach((item) => {
      if (item?.children?.length) {
        genResult(item.children);
        return;
      }
      sourceData.value.push({
        id: buildUUID(),
        path: item?.key,
        title: item?.title,
      });
    });
  }

  watch(
    () => [locale.value, menus.value],
    () => {
      sourceData.value = [];
      genResult(unref(menus));
    },
    {
      immediate: true,
    },
  );

  const changeSearchText = debounce(
    () => {
      searchResult.value = sourceData.value.filter(
        (item) => searchText.value.trim().length && item?.title?.includes(searchText.value),
      );
    },
    500,
    {
      trailing: true,
    },
  );
  watch(searchText, changeSearchText);

  const handleGoResult = (data: SearchResSourceData) => {
    router.push(data.path);
    open.value = false;
  };
  watch(open, (newVal) => {
    newVal && (searchText.value = '');
  });

  const activeIndex = ref(0);
  const handleKeydown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        if (activeIndex.value <= 0) {
          activeIndex.value = searchResult.value.length - 1;
          return;
        }
        activeIndex.value--;
        break;
      case 'ArrowDown':
        if (activeIndex.value === searchResult.value.length - 1) {
          activeIndex.value = 0;
          return;
        }
        activeIndex.value++;
        break;
      case 'Enter':
        handleGoResult(searchResult.value[activeIndex.value]);
        break;
      default:
        break;
    }
  };

  watch(open, async (newVal) => {
    await nextTick();
    newVal && inputRef.value.focus();
  });
</script>

<style lang="scss">
  .sys-search-modal {
    .ant-modal-content {
      padding: 10px 12px;
    }
    .ant-modal-footer {
      text-align: start;
    }
  }
</style>
