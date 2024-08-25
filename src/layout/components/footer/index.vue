<template>
  <a-layout-footer v-if="config.showFooter">
    Copyright © {{ config.onlineDate }}
    <a :href="config.companyWebsite || 'javascript:void(0)'" class="font-medium">
      {{ config.companyName }}
    </a>
    All Rights Reserved. 备案号：
    <a :href="config.ICP_website || 'javascript:void(0)'" class="font-medium">
      {{ config.ICP_Number }}
    </a>
  </a-layout-footer>
</template>

<script lang="ts" setup>
  import { useConfigStore } from '@/store/module/config';
  import { storeToRefs } from 'pinia';

  const configStore = useConfigStore();
  const { config } = storeToRefs(configStore);
</script>

<style lang="scss" scoped>
  a {
    color: unset;

    &:hover {
      color: var(--theme-color);
    }
  }
</style>
